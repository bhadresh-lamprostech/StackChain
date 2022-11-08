import React, { useEffect, useRef, useState } from "react";
import "./Questions.scss";
import { Editor } from "@tinymce/tinymce-react";
import { WithContext as ReactTags } from "react-tag-input";
import { create } from "ipfs-http-client";
import membericon from "./group.png";
import staticon from "./stats.png";
import Sidebar from "./Sidebar";

const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

const AddQuestions = ({ mainContract, account }) => {
  const [Question, setQuestion] = useState("");
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const [tags, setTags] = useState([]);
  const handleAddition = (tag) => {
    setTags([...tags, tag]);
    console.log(tag);
  };
  async function Datastoring() {
    if (editorRef.current) {
      console.log(title);
      console.log(editorRef.current.getContent());
      setQuestion(editorRef.current.getContent());
      console.log(Question);
    }
    //nft storage
    const client = create("https://ipfs.infura.io:5001/api/v0");
    const StringTitle = JSON.stringify(title);
    const Stringtags = JSON.stringify(tags);
    const question = {
      tile: StringTitle,
      body: editorRef.current.getContent(),
      tags: Stringtags,
    };

    const { cid } = await client.add(JSON.stringify(question));
    const questionCID = cid._baseCache.get("z");
    console.log("cid " + questionCID);
    let questionTags = [];
    for (let i = 0; i < tags.length; i++) {
      questionTags[i] = tags[i]["text"];
    }
    console.log("title");
    console.log(title);
    const tx = await mainContract.addQuestion(title, questionCID, questionTags);
    await tx.wait();
  }

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  //    //useState
  //     const [emps,setEmps] = useState([
  //         {title:title},{Question:Question},{tags:tags}
  //     ])
  //     useEffect(
  //     ()=>{
  //             console.log(emps)
  //         },[title, Question, tags])

  //nft storage
  return (
    <>
      <div className="main">
        <div className="left-section">
          <div className="question_heading">Ask a Question here</div>

          <div className="Question_fields">
            <div className="title">
              <div className="title-heading">Title</div>
              <div className="title_instruction">
                Be spacific and Imagine you are asking question to another
                person.
              </div>
              <div className="title_textfield">
                <input
                  type="text"
                  className="input_title"
                  placeholder="Enter Title of Quetion here"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="body">
              <div className="body_title">Body</div>
              <div className="body_instruction">
                Include all information someone would need to aswer the
                question.
              </div>
              <div className="body_textfield">
                <input
                  id="my-file"
                  type="file"
                  name="my-file"
                  style={{ display: "none" }}
                  onChange=""
                />

                <Editor
                  apiKey=""
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue="<p>This is the initial content of the editor.</p>"
                  init={{
                    height: 500,
                    menubar: true,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | image",
                    image_title: true,
                    automatic_uploads: true,
                    file_picker_types: "image",
                    file_picker_callback: function (callback, value, meta) {
                      if (meta.filetype == "image") {
                        var input = document.getElementById("my-file");
                        input.click();
                        input.onchange = function () {
                          var file = input.files[0];
                          var reader = new FileReader();
                          reader.onload = function (e) {
                            console.log("name", e.target.result);
                            callback(e.target.result, {
                              alt: file.name,
                            });
                          };
                          reader.readAsDataURL(file);
                        };
                      }
                    },
                    paste_data_images: true,

                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                  // tinymce.init({
                  //     selector: 'textarea',  // change this value according to your HTML
                  //     plugins: 'image',
                  //     toolbar: 'image',
                  //     image_list: [
                  //       { title: 'My image 1', value: 'https://www.example.com/my1.gif' },
                  //       { title: 'My image 2', value: 'http://www.moxiecode.com/my2.gif' }
                  //     ]
                  //   });
                />
              </div>
            </div>
            <div className="tag">
              <div className="tag_title">Tags</div>
              <div className="tag-input">
                <ReactTags
                  tags={tags}
                  delimiters={delimiters}
                  handleDelete={handleDelete}
                  handleAddition={handleAddition}
                  handleTagClick={handleTagClick}
                  inputFieldPosition="inline"
                  autocomplete
                />
              </div>
            </div>
            <div className="submit-btn-parent">
              <button onClick={Datastoring} className="submit-btn">
                Submit
              </button>
            </div>
          </div>
        </div>
        <Sidebar mainContract={mainContract} />
      </div>
    </>
  );
};

export default AddQuestions;
