import {exec, execSync} from 'child_process';
import axios from 'axios';

const puiProjectID = '1126018';
const token = '99f0bca6045f9a83715a284a1a2b37cc';

const ChangelogHelper = {
  generateChangelog: async(nextVersion) => {
    const stories = await ChangelogHelper.getStoriesSinceLastTag();
    console.log(stories);
    const bugStories = stories.filter(story => story.story_type === 'bug');
    const featureStories = stories.filter(story => story.story_type === 'feature');
    const bugFixes = ChangelogHelper.generateBugFixes()
  },

  generateBugFixes: (bugStoryList) => {
    return '### Bug Fixes\n\n' + bugStoryList.join('\n');
  },

  generateFeatures: (featureStoryList) => {
    return '### Features\n\n' + featureStoryList.join('\n');
  },

  generateStoryList: (stories) => {
    return stories.map((story) => {
      return `* ${story.name} [#${story.id}]`
    })
  },

  getBranch: () => {
    const stdout = execSync('git rev-parse --abbrev-ref HEAD');
    return stdout.toString().trim();
  },

  getStoryIDs: (commits) => {
    const storyIDRegex = /#([0-9]+)/g;
    const storyIDs = [];
    let match;

    do {
      match = storyIDRegex.exec(commits);
      if (match) {
        storyIDs.push(match[1])
      }
    } while (match);
    return storyIDs;
  },

  getStory: async(storyID) => {
    const endpoint = `https://www.pivotaltracker.com/services/v5/projects/${puiProjectID}/stories/${storyID}`;
    return await axios.get(endpoint, {headers: {'X-TrackerToken': token}});
  },

  getStoriesSinceLastTag: async() => {
    const branch = ChangelogHelper.getBranch();
    if (branch === 'HEAD') {
      console.error('Could not determine branch');
      return;
    }

    const commits = execSync(`git log \`git describe --tags --abbrev=0\`..${branch} --oneline`);

    const storyIDs = Array.from(new Set(ChangelogHelper.getStoryIDs(commits)));

    const stories = storyIDs.map(async(storyID) => {
      try {
        return (await ChangelogHelper.getStory(storyID)).data;
      } catch (e) {
      }
    });
    return (await Promise.all(stories)).filter(story => story);
  }
};

export default ChangelogHelper;