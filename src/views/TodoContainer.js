import React, { useState } from "react";
import NewTaskComponent from "./components/NewTask/NewTaskComponent";
import TaskList from "./components/TaskList/TaskList";
import { Modal } from "./components/Modals/Modal";

export default function TodoContainer() {
  const [todos, setTodos] = useState([
    {
      groupSign: "Study",
      groupId: 12,
      taskList: [
        {
          id: 1,
          taskName: "Learn English",
          time: "20:00",
          notes: "You can do it!",
          completed: false,
        },
        {
          id: 2,
          taskName: "Learn Ract",
          time: "21:00",
          notes: "Finish TODO",
          completed: true,
        },
      ],
    },
    {
      groupSign: "Chill",
      groupId: 14,
      taskList: [
        {
          id: 4,
          taskName: "Sleep early",
          time: "23:00",
          notes: "Dreams is waiting for you",
          completed: false,
        },
      ],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModal(boolean) {
    setIsModalOpen(boolean);
  }

  function changeTodos(todo) {
    setTodos(
      todos.map((group) => {
        group.taskList.map((task) => {
          if (task.id === todo.id) {
            task.completed = !task.completed;
          }
          return task;
        });
        return group;
      })
    );
  }

  function deleteTask(id) {
    setTodos(
      todos.filter((group) => {
        group.taskList = group.taskList.filter((task) => task.id !== id);
        if (!group.taskList.length) {
          console.log(`В ГРУППЕ ${group.groupSign} НЕТ ЗАДАЧ!`);
          return false;
        }
        return group.taskList;
      })
    );
  }

  function deleteGroup(e) {
    console.log("CONTAINER DELETE_GROUP", e);
  }

  function saveTask(item) {
    console.log("TODO CONTAINER! SAVE", item);

    setTodos([...todos, ...[item]]);
    toggleModal(false);
  }

  return (
    <main className="main">
      <div className="task-list__wrapper">
        <TaskList
          onChange={changeTodos}
          groupList={todos}
          onDeleteTask={deleteTask}
          openModal={toggleModal}
          onDeleteGroup={deleteGroup}
        />
        <Modal open={isModalOpen}>
          <NewTaskComponent openModal={toggleModal} onSubmit={saveTask} />
        </Modal>
      </div>
    </main>
  );
}
