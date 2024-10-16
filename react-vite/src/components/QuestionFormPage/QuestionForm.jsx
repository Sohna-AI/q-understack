import * as questionActions from '../../redux/questions';
import { thunkCreateQuestion, thunkGetQuestionDetailsById, thunkUpdateQuestion } from '../../utils/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './QuestionForm.css';
import RenderMarkdown from '../RenderMarkdown';

export default function QuestionForm({ edit }) {
  const editId = useParams()['questionId'];
  const questions = useSelector(questionActions.selectQuestions);
  const [expectations, setExpectations] = useState('');
  const [isCreated, setIsCreated] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [details, setDetails] = useState('');
  const [errors, setErrors] = useState({});
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // TODO check sessionUser validity

  useEffect(() => {
    if (edit) {
      dispatch(thunkGetQuestionDetailsById(+editId)).then((data) => {
        const tags = [];
        for (let tag of data.tags) {
          tags.push(tag.tag_name);
        }
        setExpectations(data.expectation);
        setDetails(data.details);
        setTitle(data.title);
        setTags(tags);
      });
    }
  }, [editId, dispatch, edit, navigate]);

  useEffect(() => {
    if (isCreated && !edit) {
      const id = questions?.data[questions.allIds[questions.allIds.length - 1]].id;
      navigate(`/questions/${id}`);
    } else if (isCreated) {
      navigate(`/questions/${editId}`);
    }
  }, [isCreated, navigate, questions, edit, editId]);

  const addTag = (e) => {
    setErrors({});
    e.preventDefault();
    if (tags.length < 5 && tagInput.length > 1) {
      setTags([...tags, tagInput]);
      setTagInput('');
    } else if (tagInput.length <= 1) {
      setErrors({ tags: 'Tag name too short.' });
    } else {
      setErrors({ tags: 'Too many tags.' });
    }
  };

  const removeTag = (e) => {
    setErrors({});
    const tag = e.target.previousSibling.innerText;
    const index = tags.indexOf(tag);
    let arr = tags.slice();
    arr.splice(index, 1);
    setTags(arr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const data = {
      title: title,
      details: details,
      expectation: expectations,
      tags: tags,
    };
    if (edit) {
      await dispatch(thunkUpdateQuestion(JSON.stringify(data), editId)).then(() => setIsCreated(true));
    } else {
      const newQuestion = await dispatch(thunkCreateQuestion(JSON.stringify(data)));
      if (newQuestion) return setErrors(newQuestion);
      else setIsCreated(true);
    }
  };

  const handleKeyPress = (e, bool) => {
    setErrors({});
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      if (bool) {
        setDetails(details.substring(0, start) + '    ' + details.substring(end));
      } else {
        setExpectations(expectations.substring(0, start) + '    ' + expectations.substring(end));
      }
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      }, 0);
    }
    if (e.key === '{') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      if (bool) {
        setDetails(details.substring(0, start) + '{}' + details.substring(end));
      } else {
        setExpectations(expectations.substring(0, start) + '{}' + expectations.substring(end));
      }
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 1;
      }, 0);
    }
  };

  return (
    <div id="question-form-page" className="flex column">
      <div>
        {edit ? <h1>Update question</h1> : <h1>Ask a question</h1>}
        <h2>Don&apos;t ask well formed questions. Expect wild answers.</h2>
      </div>
      <form className="flex column gap-15" onSubmit={handleSubmit}>
        <div className="flex column gap-15">
          <label className="question-title-error">
            Title
            {errors.title && <p className="errors">{errors.title}</p>}
          </label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="flex column gap-15">
          <label className="question-detail-error">
            What are the details of your problem?
            {errors.details && <p className="errors">{errors.details}</p>}
          </label>
          {details.length > 0 && (
            <div className="pad10 border">
              <RenderMarkdown text={details} />
            </div>
          )}
          <textarea
            className="question-textarea pad10"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e, true)}
          />
        </div>
        <div className="flex column gap-15">
          <label className="question-expectation-error">
            What did you try? What were you expecting?
            {errors.expectation && <p className="errors">{errors.expectation}</p>}
          </label>
          {expectations.length > 0 && (
            <div className="pad10 border">
              <RenderMarkdown text={expectations} />
            </div>
          )}
          <textarea
            className="question-textarea pad10"
            value={expectations}
            onChange={(e) => setExpectations(e.target.value)}
            onKeyDown={(e) => handleKeyPress(e, false)}
          />
        </div>
        <div className="flex column gap-15">
          <label>Tags</label>
          <div className="flex column gap-15">
            <div className="flex gap-15">
              <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} />
              <button className="button" onClick={addTag}>
                Add tag
              </button>
            </div>
            <div className="flex gap-15">
              {tags.map((tag, i) => {
                return (
                  <div key={`${i}:${tag}`} name={i} className="tag flex">
                    <p className="no-margin tag-text">{tag}</p>
                    <p onClick={removeTag} className="no-margin x-button">
                      X
                    </p>
                  </div>
                );
              })}
            </div>
            {errors.tags && <p className="errors">{errors.tags}</p>}
          </div>
        </div>
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
