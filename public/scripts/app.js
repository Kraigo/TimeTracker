"use strict";

var data = [{ id: 1, author: "Pete Hunt", text: "This is one comment" }, { id: 2, author: "Jordan Walke", text: "This is *another* comment" }];

var CommentBox = React.createClass({ displayName: "CommentBox",
  render: function render() {
    return React.createElement("div", { className: "commentBox" }, React.createElement("h1", null, "Comments"), React.createElement(CommentList, { data: this.props.data }), React.createElement(CommentForm, null));
  }
});

var CommentList = React.createClass({ displayName: "CommentList",
  render: function render() {
    var commentNodes = this.props.data.map(function (comment) {
      return React.createElement(Comment, { author: comment.author, key: comment.id }, comment.text);
    });
    return React.createElement("div", { className: "commentList" }, commentNodes);
  }
});

var CommentForm = React.createClass({ displayName: "CommentForm",
  render: function render() {
    return React.createElement("div", { className: "commentForm" }, "Hello, world! I am a CommentForm.");
  }
});

var Comment = React.createClass({ displayName: "Comment",
  rawMarkup: function rawMarkup() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },
  render: function render() {
    return React.createElement("div", { className: "comment" }, React.createElement("h2", { className: "commentAuthor" }, this.props.author), React.createElement("span", { dangerouslySetInnerHTML: this.rawMarkup() }));
  }
});

ReactDOM.render(React.createElement(CommentBox, { data: data }), document.getElementById('content'));