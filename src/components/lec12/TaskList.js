import { Component } from "react"
import './assets/TaskItem.css'
import { v4 as uuidv4 } from 'uuid'; // to generate unique ID, to use for keys

class TaskList extends Component {


    state = {
        inputValue: '',
        tasksToDo: [],
        tasksCompleted: []
        //tasks: [{id:1, taskName:"Task 1"}, {id:2, taskName:"Task 2"}, {id:3, taskName:"Task 3"}]
    }

    addTask = (event) => {

        event.preventDefault()



        const value = this.state.inputValue

        if (value == '') // checks an empty value
        {
            alert("Empty Task Name")
            return
        }
        if (this.isDuplicate(value) == false) // checks duplicate
        {

            //console.log(value)
            const newTask = { id: uuidv4(), taskName: value }

            //console.log(newTask)
            this.setState(
                {
                    tasksToDo: [...this.state.tasksToDo, newTask],
                    inputValue: ''
                })


        } else {
            alert('Duplicate Task Name')
            return
        }



    }

    completeTask = (id, taskName) => {
        //solution 1, by passing id and taskname, suitable for the objects with a few keys/value pairs


        console.log(taskName)
        const newTask = { id: id, taskName: taskName }


        this.setState(
            {
                tasksCompleted: [...this.state.tasksCompleted, newTask],
                inputValue: ''
            })

        this.removeTask(id, "tasksToDo")






    }

    undoTask = (id) => {

        // solution 2, by passing only ID, suitable for the objects with lots of key/value pair
        const newTask = this.state.tasksCompleted.find((item) => item.id === id) // find object by id



        //console.log(taskName)
        //const newTask = {id:id, taskName:taskName}


        this.setState(
            {
                tasksToDo: [...this.state.tasksToDo, newTask],
                inputValue: ''
            })

        this.removeTask(id, "tasksCompleted")






    }



    removeTask = (id, arr) => {


        const newTasks = this.state[arr].filter((task) => task.id != id)

        this.setState(
            {
                inputValue: '',
                [arr]: newTasks
            }
        )
    }


    isDuplicate = (value) => { // checks if alreeady there is the same Task Name
        return this.state.tasksToDo.some((task) => task.taskName == value


        )

    }

    onChange = (event) => {

        const value = event.target.value
        this.setState(
            {
                inputValue: value
            }
        )

    }


    render() {

        return (

            <div>


                <div className="form-div">

                    <form onSubmit={this.addTask} className="add-task-form">
                        <input type="text" onChange={this.onChange} value={this.state.inputValue}></input>
                        <button type="submit">დაამატე დავალება</button>


                    </form>


                </div>

                <div className="two-columns">

                    <div>

                        {this.state.tasksToDo.map((task) => {
                            return (

                                <div key={task.id} className="task-item">
                                    ID: {task.id}
                                    <br /> Name: {task.taskName}

                                    <button onClick={() => this.completeTask(task.id, task.taskName)} className="task-action-btn">Complete Task</button>
                                </div>

                            )
                        })}

                    </div>

                    <div className="left-column">

                        {this.state.tasksCompleted.map((task) => {
                            return (

                                <div key={task.id} className="task-item">
                                    ID: {task.id}
                                    <br /> Name: {task.taskName}

                                    <button onClick={() => this.undoTask(task.id)} className="task-action-btn">Undo Task</button>
                                    <button onClick={() => this.removeTask(task.id, "tasksCompleted")} className="task-action-btn">Remove Task</button>
                                </div>

                            )
                        })}

                    </div>
                </div>


            </div>

        )
    }




}

export default TaskList