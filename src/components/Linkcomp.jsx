import { useState } from "react";
import style from '../routes/css/link.module.css'

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
    <div className={style.link}>
      <div className={style.linkInfo}>
        <div className={style.linkTitle}>
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
                <button className={style.btnEdit} onClick={hanldeEditTitle}>
                  <span className="material-icons">edit</span>
                </button>
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
                <button className={style.btnEdit} onClick={hanldeEditUrl}>
                <span className="material-icons">edit</span>
                </button>
                {currentUrl}
              </>
            )}
          </div>
        </div>
      </div>

      <div>
        <button className={style.btnDelete} onClick={handleDelete}>
          <span className="material-icons">delete</span>
        </button>
      </div>
    </div>
  );
};
