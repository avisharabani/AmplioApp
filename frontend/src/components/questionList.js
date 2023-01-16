
import QuestionRow from "../components/questionRow";

const QuestionList = ({ questions, setQuestion }) => {

  const addQuestion = () => {
    // setQuestions([
    //   ...questions,
    //   {
    //     id: 3,
    //     address: "32 Valley Way, New York",
    //     country: "USA",
    //     price: 1000000,
    //   },
    // ]);
  };

  return (
    <>

      <ul>
        {Object.values(questions).map((question, i) => (
          <QuestionRow key={question.id} question={question} index={i}
            setQuestion={setQuestion} />
        ))

        }
      </ul>
      <button className="btn btn-primary" onClick={addQuestion}>
        Add
      </button>
    </>
  );
};

export default QuestionList;
