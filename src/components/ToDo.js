import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

function ToDo() {
    const [tasks,setTasks]=useState([
        {
            id:1,
            title:"Buy 1 kg Tomato",
        },
        {
            id:2,
            title:"Buy 2 kg Carrot",
        },
        {
            id:3,
            title:"Buy 1 kg Banana",
        },
        {
            id:4,
            title:"Buy 2 kg Chicken",
        },

    ]);
    const [complete,setComplete]=useState([
        {
            id:5,
            title:"Do Homework",
        },
        {
            id:6,
            title:"Wash Clothes",
        },
        {
            id:7,
            title:"Niggesh",
        },
    ]);
    const [NewTask, setNewTask]=useState("");
    const [ItemCount, setItemCount]=useState(0);
    useEffect(()=>{
        setItemCount(complete.length + tasks.length);
    });

    const deleteTask=(id)=>{
        let new_list=tasks.filter((task)=>task.id!==id);
        setTasks(new_list);
    }
    const deleteComplete=(id)=>{
        let new_list=complete.filter((task)=>task.id!==id);
        setComplete(new_list);
    }
    const CompleteTask=(id)=>{
        let current_tasks=tasks.find((task)=>task.id==id);
        
        setComplete([...complete,current_tasks]);
         let new_list=complete.filter((task)=>task.id!==id);
         setTasks(new_list);
    }
     const revertTask=(id)=>{
       let current_tasks=complete.find((task)=>task.id==id);
         setTasks([...tasks,current_tasks]);
         let new_list=complete.filter((task)=>task.id!==id);
         setComplete(new_list);
    }
        const RenderTasks=()=>{
        return tasks.map((tasks)=>(
            <ListItem>
            <LeftContainer> 
                <CheckContainer>
                   
                </CheckContainer>
                <ItemContent>
                    {tasks.id}, {tasks.title}
                    </ItemContent>
            </LeftContainer>
            <RightContainer>
                <ActionButton onClick={()=>deleteTask(tasks.id)}>
                    <ButtonImage src={require("./assets/delete.svg").default} alt='delete' />
                </ActionButton>
            </RightContainer>
        </ListItem>
        )) 
    };
    const RenderComplete=()=>{
        return complete.map((tasks)=>(
            <ListItem>
            <LeftContainer onClick={()=>CompleteTask(tasks.id)}> 
                <CheckContainerComplete>
                    <TickImage src={require("./assets/tick-green.svg").default} alt='tick' />
                </CheckContainerComplete>
                <ItemContentComplete> {tasks.id}, {tasks.title}</ItemContentComplete>
            </LeftContainer>
            <RightContainer>
                <ActionButton>
                    <ButtonImage onClick={()=>revertTask(tasks.id)} src={require("./assets/revert.svg").default} alt='revert' />
                </ActionButton>
                <ActionButton>
                    <ButtonImage onClick={()=>deleteComplete(tasks.id)} src={require("./assets/delete.svg").default} alt='delete' />
                </ActionButton>
            </RightContainer>
        </ListItem>
        )) 
    }

    const addNewTask =(event)=>{
        event.preventDefault();
      let new_tasks= {
            id:ItemCount+1,
            title: NewTask,
        };
        setTasks=([...tasks, new_tasks]);
        setNewTask("");
        setItemCount((prev)=>prev+1);
        
    };
    return ( 
        <Container>
            <Heading>ToDo list</Heading>
            <TodoContainer>
                <SubHeading>Things To Do</SubHeading>
                <ToDoList>
                   {RenderTasks()}
                </ToDoList>
            </TodoContainer>
            <NewToDoForm>
                <FormInput value={NewTask}
                        onChange={(e)=>setNewTask(e.target.value)}
                     placeholder='type new task' />
                <FormSubmitButton onClick={(e)=>addNewTask(e)}>add new</FormSubmitButton>
            </NewToDoForm>
            <TodoContainer>
            <SubHeading>Things To Do</SubHeading>
                <ToDoList>
                {RenderComplete()}
                </ToDoList>
            </TodoContainer>
        </Container>
    );
}

export default ToDo;
   
const Container=styled.div`
    width=90%auto;
    max-width:1000px;
    padding:50px 10%; 
    border-left: 2px solid #f5f5f5;
    border-right: 2px solid #f5f5f5;
    margin :0 auto;
    min-height:100vh;
    `;
const Heading=styled.h1`
    font-size:52px;
    font-weight:bold;
    text-align:center;
    margin-bottom:40px;
    `;
const TodoContainer=styled.div``;
const SubHeading=styled.h3`
    font-size:36px;
    color:#050241;
    `;
const ToDoList=styled.ul`
    `;
const ListItem=styled.li`
    display:flex;
    align-items: center;
    justify-content:space-between;
    margin-bottom:20px;
    
    `;
const LeftContainer=styled.div`
    display:flex;
    align-items:center;
    `;
const CheckContainer=styled.span`
    width:32px;
    height:32px;
    border-radius:50%;
    border: 1px solid #050241;
    display:inline-block;
    margin-right:10px;
    cursor:pointer;
    `;
const ItemContent=styled.span`
    cursor:pointer;
    font-size:28px;
    `;
const RightContainer=styled.div``;
const ActionButton=styled.button`
        border:none;
    background:none;
    cursor:pointer;
    margin-right:20px;
    outline:none;
    &:last-child{
    margin-right:0;
    }
`;
const ButtonImage=styled.img``;
const NewToDoForm=styled.form`
    display:flex;
    margin-left:40px;
    margin-top:30px;
    position:relative;
    &&::before{
    content:"";
    background-image: url(${require("./assets/plus.svg").default});
    width:16px;
    height:16px;
    display:block;
    position:absolute;
    left:10px;
    top:0;
    bottom:0;
    margin:0 auto;
    z-index:2;
    }
`;
const FormInput=styled.input`
    display:block;
    width:100%;
    outline:none;
    border:1px solid #c6c6c6;
    border-right:none ;
    padding : 0 10px 0 45px;
     font-size:22px;
`;
const FormSubmitButton=styled.button`
  padding:15px 25px;
  white-space:nowrap;
   cursor:pointer;
   border:none;
   background:#050241;
   color:#fff;
   border-radius:6px;
   font-size:24px;

`;
const CheckContainerComplete=styled(CheckContainer)`
     display:flex;
    align-items: center;
    justify-content:center;
    border-color:#06c692;

`;
const ItemContentComplete=styled(ItemContent)``;
const TickImage=styled.img``;

