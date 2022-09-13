import { useState } from "react";

export const Linkcomp = ({ docId, title, url, onDelete, onuPdate }) => {
  console.log("🚀 ~ file: Linkcomp.jsx ~ line 4 ~ Linkcomp ~ docId", docId)
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentUrl, setCurrentUrl] = useState(url);

  const [editTitle, setEditTitle] = useState(false);
  const [editurl, setEditUrl] = useState(false);

  function hanldeEditTitle() {
    setEditTitle(true);
  }
  function hanldeEditUrl() {
    setEditUrl(true);
  }

  function handleChangeTitle(e) {
    setCurrentTitle(e.target.value);
  }
  function handleChangeUrl(e) {
    setCurrentUrl(e.target.value);
  }

  /**
   * Cuando pierde el foco el input
   */

  function handleBlurUrl(e){
    setEditUrl(false)
    onuPdate(docId,currentTitle,currentUrl)

  }
  function handleBlurTitle(e){
    setEditTitle(false)
    onuPdate(docId,currentTitle,currentUrl)
  }

  function handleDelete(){
    onDelete(docId)
  }

  return (
    <div key={docId}>
      <div>
        <div>
          <div>
            {editTitle ? (
              <>
                <input
                  onChange={handleChangeTitle}
                  autoFocus
                  type="text"
                  value={currentTitle}
                  onBlur={handleBlurTitle}
                />
              </>
            ) : (
              <>
                <button onClick={hanldeEditTitle}>edit</button>
                {currentTitle}
              </>
            )}
          </div>
        </div>
        <div>
          <div>
            {editurl ? (
              <>
                <input
                  type="text"
                  autoFocus
                  value={currentUrl}
                  onChange={handleChangeUrl}
                  onBlur={handleBlurUrl}
                />
              </>
            ) : (
              <>
                <button onClick={hanldeEditUrl}>edit</button>
                {currentUrl}
              </>
            )}
          </div>
        </div>
      </div>

      <div>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};
