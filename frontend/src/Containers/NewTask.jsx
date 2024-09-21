import "./TaskForm.css";

const NewTask = () => {
  function addTaskSubmitHandler(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    const newTask = {
      id: "u1Test",
      title: data.title,
      description: data.description,
      pictureUrl: data.pictureUrl,
      creator: "u1",
    };
    TASKS.push(newTask);
    console.log(TASKS);
    event.target.reset();
  }

  return (
    <form onSubmit={addTaskSubmitHandler}>
      <h2>New Task</h2>

      <div className="control">
        <label htmlFor="title">Task title</label>
        <input id="title" type="text" name="title" />
      </div>

      <div className="control">
        <label htmlFor="description">Task description</label>
        <textarea
          id="description"
          type="text"
          name="description"
          rows="4"
          cols="35"
        />
      </div>

      <div className="control">
        <label htmlFor="pictureUrl">Picture url</label>
        <input id="pictureUrl" type="text" name="pictureUrl" />
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          Add
        </button>
      </p>
    </form>
  );
};

export default NewTask;
