import ChangelogHelper from '../../tasks/helpers/changelog-helper';
import ChildProcess from 'child_process';
import axios from 'axios';

fdescribe('ChangelogHelper', () => {
  describe('#getBranch', () => {
    let branch;

    beforeEach(() => {
      spyOn(ChildProcess, 'execSync').and.returnValue('branch-name  ');
      branch = ChangelogHelper.getBranch();
    });

    it('returns the branch name', () => {
      expect(branch).toBe('branch-name');
    })
  });

  describe('#getStoryIDs', () => {
    let storyIDs;

    beforeEach(() => {
      const commits = 'some commit[#12345678]\nsome commit2[#454522335]\nsome commit3 #898945\n';
      storyIDs = ChangelogHelper.getStoryIDs(commits);
    });

    it('gets all the story ids', () => {
      expect(storyIDs).toEqual(['12345678', '454522335', '898945']);
    });
  });

  describe('#getStory', () => {
    let story;

    beforeEach(async(done) => {
      spyOn(axios, 'get').and.returnValue(Promise.resolve({data: {resp: 'resp'}}));
      done();
    });

    it('calls the correct endpoint', async(done) => {
      await ChangelogHelper.getStory('12345');
      expect(axios.get).toHaveBeenCalledWith(`https://www.pivotaltracker.com/services/v5/projects/1126018/stories/12345`,
        {headers: {'X-TrackerToken': '99f0bca6045f9a83715a284a1a2b37cc'}});
      done();
    });

    it('returns the story', async(done) => {
      story = await ChangelogHelper.getStory('12345');
      expect(story).toEqual({data: {resp: 'resp'}});
      done();
    });
  });

  describe('#getStoriesSinceLastTag', () => {
    describe('when branch cannot be determined', () => {
      beforeEach(() => {
        spyOn(ChangelogHelper, 'getBranch').and.returnValue('HEAD');
      });

      it('returns undefined', async(done) => {
        const stories = await ChangelogHelper.getStoriesSinceLastTag();
        expect(stories).toBeUndefined();
        done();
      });
    });

    describe('when branch can be determined', () => {
      let stories, commit;

      beforeEach(() => {
        commit = 'commit 1 [#123]\ncommit 2 [#456]\ncommit 3 [#789]\ncommit 4 [#123]';
        spyOn(ChildProcess, 'execSync').and.returnValue(commit);
        spyOn(ChangelogHelper, 'getStoryIDs').and.returnValue(['123', '456', '789', '123']);
        spyOn(ChangelogHelper, 'getStory').and.callFake((storyID) => {
          return storyID === '789' ? Promise.resolve(undefined) : Promise.resolve({id: storyID});
        });
        spyOn(ChangelogHelper, 'getBranch').and.returnValue('v9');
      });

      it('gets the commits since last tag', async(done) => {
        stories = await ChangelogHelper.getStoriesSinceLastTag();
        expect(ChildProcess.execSync).toHaveBeenCalledWith('git log `git describe --tags --abbrev=0`..v9 --oneline')
        done();
      });

      it('gets the story IDs', async(done) => {
        stories = await ChangelogHelper.getStoriesSinceLastTag();
        expect(ChangelogHelper.getStoryIDs).toHaveBeenCalledWith(commit);
        done();
      });

      it('calls getStory for each story id', async(done) => {
        stories = await ChangelogHelper.getStoriesSinceLastTag();
        expect(ChangelogHelper.getStory).toHaveBeenCalledWith('123');
        expect(ChangelogHelper.getStory).toHaveBeenCalledWith('456');
        expect(ChangelogHelper.getStory).toHaveBeenCalledWith('789');
        done();
      });

      it('returns all the stories', async(done) => {
        stories = await ChangelogHelper.getStoriesSinceLastTag();
        expect(stories).toEqual([{id: '123'}, {id: '456'}]);
        done();
      });
    });
  });

  describe('#generateStoryList', () => {
    let stories, storyList;

    beforeEach(() => {
      stories = [{name: 'name1', id: '123'}, {name: 'name2', id: '456'}];
      storyList = ChangelogHelper.generateStoryList(stories);
    });

    it('returns a list of bullet points', () => {
      expect(storyList).toEqual(['* name1 [#123]', '* name2 [#456]'])
    });
  });

  describe('#generateBugFixes', () => {
    let storyList, bugFixes;

    beforeEach(() => {
      storyList = ['* name1 [#123]', '* name2 [#456]'];
      bugFixes = ChangelogHelper.generateBugFixes(storyList);
    });

    it('returns a bug fix section', () => {
      expect(bugFixes).toEqual('### Bug Fixes\n\n* name1 [#123]\n* name2 [#456]')
    });
  });

  describe('#generateFeatures', () => {
    let storyList, features;

    beforeEach(() => {
      storyList = ['* name1 [#123]', '* name2 [#456]'];
      features = ChangelogHelper.generateFeatures(storyList);
    });

    it('returns a bug fix section', () => {
      expect(features).toEqual('### Features\n\n* name1 [#123]\n* name2 [#456]')
    });
  });
});