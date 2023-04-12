const textInput=document.querySelector('.textInput');
const addBtn=document.querySelector('.addBtn');
const ul=document.querySelector('.list');
const clear=document.querySelector('.clear');
let val=0;
let itemsArray=JSON.parse(localStorage.getItem('tasks')) || [];

if(localStorage.getItem('tasks')){
  itemsArray.map((task)=>{
createTask(task);
if(task.isCompleted){
 document.getElementById(task.id).classList.add('opacity');
 document.getElementById(task.id).lastElementChild.firstElementChild.firstElementChild.classList.add('decoration');
 }
 else{
  document.getElementById(task.id).classList.remove('opacity')
  document.getElementById(task.id).lastElementChild.firstElementChild.firstElementChild.classList.remove('decoration');
 }
  })
}

addBtn.addEventListener("click",addLocalStorage);
textInput.addEventListener('keypress',(e)=>{
  if(e.key=='Enter'){
    e.preventDefault();
    addLocalStorage();
  }
  })
  

  function addLocalStorage(){
    const inputValue=textInput.value;
    if(inputValue!==''){
      
      const task={
        id:new Date().getTime(),
  name:inputValue,
  isCompleted:false
      }
      itemsArray.push(task);
    localStorage.setItem('tasks',JSON.stringify(itemsArray));
    createTask(task);
     
    }
   
  }
  
  function createTask(task){
    const taskEl=document.createElement('li');
  taskEl.setAttribute('id',task.id);
  
  
  const taskMarkup=`<input class="checkbox" type="checkbox" id="${val}" ${task.isCompleted ? 'checked' : ''}>
      <label for="${val}">
      <div class="checkboxText">
      <span class="text">${task.name}</span>
       <i class="fa-regular fa-trash-can delete"></i>
      </div>
      </label>`
  
    
     taskEl.innerHTML=taskMarkup;
     ul.appendChild(taskEl);
     val++;
      textInput.value='';
  }

ul.addEventListener('click',(e)=>{
if(e.target.classList.contains('delete')){
  const taskId=e.target.closest('li').id;
  removeTask(taskId);
}
})

function removeTask(taskId){
  itemsArray=itemsArray.filter(task => task.id!==parseInt(taskId)
  )
  localStorage.setItem('tasks',JSON.stringify(itemsArray));
  document.getElementById(taskId).remove();
}

ul.addEventListener('click',(e)=>{
  if(e.target.classList.contains('checkbox')){
    const taskId=e.target.closest('li').id;
    completeTask(taskId,e.target);
    
  }
  })

function completeTask(taskId,el){
const task=itemsArray.find((task)=> task.id==parseInt(taskId));
const parent=el.closest('li');
task.isCompleted=!task.isCompleted;

if(task.isCompleted){
  parent.classList.add('opacity');
  parent.lastElementChild.firstElementChild.firstElementChild.classList.add('decoration');
 }
 else{
   parent.classList.remove('opacity')
   parent.lastElementChild.firstElementChild.firstElementChild.classList.remove('decoration');
 }

 localStorage.setItem('tasks',JSON.stringify(itemsArray));
  }

  clear.addEventListener('click',()=>{
    ul.innerHTML='';
    itemsArray=[];
    localStorage.setItem('tasks',JSON.stringify(itemsArray));
   })