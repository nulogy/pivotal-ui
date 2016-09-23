/*doc
 ---
 title: Copy To Clipboard
 name: copy_to_clipboard_react
 categories:
 - react_components_copy-to-clipboard
 - react_all
 ---

 <code class="pam">
 <i class="fa fa-download" alt="Install the Component"></i>
 npm install pui-react-copy-to-clipboard --save
 </code>

 Require the subcomponents:

 ```
var CopyToClipboard = require('pui-react-copy-to-clipboard').CopyToClipboard;
var CopyToClipboardButton = require('pui-react-copy-to-clipboard').CopyToClipboardButton;
 ```


 ```react_example_table
<CopyToClipboard text="I got copied by a button"><button>Click Me To Copy</button></CopyToClipboard>

<CopyToClipboardButton text="I got copied by a good looking button"/>
 ```

 The CopyToClipboard Components require the following property:

 Property           |  Type         | Description
 -------------      | --------------| --------------------------------------------------------------------------
 `text`       | String        | Text that is copied when the user clicks

 */