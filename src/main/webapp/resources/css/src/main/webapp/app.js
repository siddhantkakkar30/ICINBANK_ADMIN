//BUDGET CONTROLLER keeps track of incomes and expenses
var budgetController=(function(){
        //we need a data model for expenses and income.each new item will have a description and a value.we also know that we should probaly have some way to distinguish between different incomes and expenses and so se want them to have a unique id number as well.so how can we store this kind of data.best way is thst we will select an object that simply has a description a value and an id.so what we do to create lots objects is to create a function constructor which we can then use to extantiate lots of expense and income objects
    var Expense=function(id,description,value){//we choose to create objects here through the expense function constructor because there will be lots of expenses
        this.id=id;
        this.description=description;
        this.value=value;
        this.percentage=-1;
    };
    Expense.prototype.calcPercentage=function(totalIncome){
        if(totalIncome>0){
        this.percentage=Math.round((this.value/totalIncome)*100);
    }
        else{this.percentage=-1;
            }
    };
    Expense.prototype.getPercentage=function(){
        return this.percentage;
    }
    var Income=function(id,description,value){
        this.id=id;
        this.description=description;
        this.value=value;
    };
    var calculateTotal=function(type){
      var sum=0; 
      data.allItems[type].forEach(/*forEach method accepts a callback function*/function(cur/*it accepts three parameters that are current value,current index and the array itself but we only need current element*/){
          sum=sum+cur.value;/*inside the Expense and Income object they both have the property value inside it.so cur refers to either the income or the expense object that is stored at the current position at the exp or inc array and cur.value means Expense.vakue or Income.value*/
          
      })
        data.totals[type]=sum;
    };
    var data={//contains two objects
        allItems:{
            exp:[],
            inc:[]//both these arrays will store all instances of either incomes or expenses
        },
        totals:
        {
            exp:0,
            inc:0
        },
        budget:5000,
        percentage:-1/*means non existent so if there are no budget values or no total expenses or incomes then there cant be a percentage*/
        
    };
         
   return {
       addItem:function(type,des,val){//If we recieve type as exp then a newItem object will be created from the Expense function constructor and vice versa
           var newItem,ID;//it is  unique number that we want to assign to each new item that we put either in the expense or in the income array of the allitems
            //[1,2,4,5],then the next id will be 6 and if we delete elements then corresponding id will be removed [1,3,4,6,8],nextid=9
            //ID=lastID+1
           if(data.allItems[type].length>0)//if the length of a
             {
              ID=data.allItems[type][data.allItems[type].length-1].id + 1;
              }
           else{
               ID=0;
           }
           if(type==='exp'){
           newItem=new Expense(ID,des,val);}
           else if(type==='inc'){
              newItem=new Income(ID,des,val); 
           }
            //after we have newitem then we can add it to our data.so all of this items will be stored in data object and inside the data object in the allitem object and in there we have two array called exp and inc and exp and inc are the exact same name as we recieve in type
            data.allItems[type].push(newItem);//array contains newitem object
           return newItem;//because the other modules or the functions that is going to call this function can have direct access to the newitem that we just created
       },
       deleteItem:function(type,id/*we are passing the type and id of the item that we want to delete*/){
           var ids,index;
           //id=6 we want to delete
           //ids= [1,2,4,6,8]
           //so we will delete the id stored at the index value=3

        //we will create an array with all of the id numbers that we have and then find out what the index of our input id is so basicaly index of the element that we want to remove
        ids/*stores an array with the same length as data.allItem[type]array*/=data.allItems[type].map(function(current)/*recieves call back func as arguement which has access to current element ,current index and array*/{
           return current.id;//imagine in the allitem[type] array  we have five income object which has these ids so after the map method we get exactly the id array in upper comment
       })//map is very similar to foreach but the only difference is that map returns a brand new array
       index=ids.indexOf(id);
           if(index!==-1)//it means that if we cant find the index of id or id is not in the array
               {
                   //splice method is used to remove elements 
                   data.allItems[type].splice(/*first element is the position number at which we want to start deleting,second argument is the number of elements we want to delete.so at first arguement we will pass the index that contains the index of the id that we want to delete and number of elements as 1*/index,1);
               }
       }
       ,
       calculateBudget:function(){
           //calculate total income and expenses
           calculateTotal('exp');
           calculateTotal('inc');
           //calculate budget:income-expenses
           data.budget=data.totals.inc-data.totals.exp;
           //calculate the percentage of income that we spent
           if(data.totals.inc>0)//it was giving infinity value before when we only added expense as at that time income is 0 and there is only expense so anything divided by 0 is infinity
          { data.percentage=Math.round((data.totals.exp/data.totals.inc)*100);//rounds off to the nearest integer value
          }
           else{
               data.percentage=-1;
           }
           //Expense=100 and Income =200 ,spent 50%=100/200=0.5*100
           
       },
       calculatePercentages:function()
{
    //we have to calculate the expense percentage for each of the expense objects that are stored in the expenses array
    /*
    a=20
    b=30
    c=40 these 3 are the expenses
    income=100
    a=20/100=20% of total income
    */
    data.allItems.exp.forEach(function(curr){
        curr.calcPercentage(data.totals.inc);
    })
},
       getPercentages:function(){
         var allPerc=data.allItems.exp.map(function(curr){
             return curr.getPercentage();//if there are 5 elements,then this staatementget called 5 times nd this statement means we are calling the getPercentage for each element and then return it and store in the allPerc array
         })  
         return allPerc;////return the array
       },
       getBudget:function(){
         return{//we are returning object having these properties
             budget:data.budget,
             totalInc:data.totals.inc,
             totalExp:data.totals.exp,
             percentage:data.percentage
         }  
       },
       testing:function(){console.log(data);}
       
           
       
   }
            })();
//UI Controller
var UIController=(function(){
    //the code that we write in the IIFE will execute immediately and the object that we return will be assigned to the ui controller and the variables and the functions that we define in the IIFE will stay in the closure even after IIFE returns
    var DOMStrings={
        inputType:'.add__type',
        inputDescription:'.add__description',
        inputValue:'.add__value',
        inputBtn:'.add__btn',
        incomeContainer:'.income__list',
        expensesContainer:'.expenses__list',
        budgetLabel:'.budget__value',
        incomeLabel:'.budget__income--value',
        expenseLabel:'.budget__expenses--value',
        percentageLabel:'.budget__expenses--percentage',
        container:'.container',
        expensePercLabel:'.item__percentage',
        dateLabel:'.budget__title--month'
        
    }
    var formatNumber=function(num,type){
            var numSplit,int,dec;
            /*
            + or - before any number
            exactly 2 decimal points
            comma separating the thousands
            2310.4567=>+2,310.46
            2000=>+2,000.00
            */
            num=Math.abs(num);/*removes the sign of the number and overriding the num*/
            num=num.toFixed(2)/*this is not the method of the math object but its the method of the number prototype.as we know strings and numbers can also have methods even if they are originally primitive data type but when we use methods on number or strings then it converts it to object.this puts two numbers after a number after. if we have 4 then round it to 2
            (2.34344).toFixed(2)
            "2.34" it is a string*/
            numSplit=num.split('.')//as num is converted to string,we can use split on it and it split the number in two parts and stores it in the array
            int=numSplit[0];
            decimal=numSplit[1];
            if(int.length>3)//'2310'>3
                {
                    //int=int.substr(/*first argument is the index no. from where we want to start and the second number is how many characters we want (0,1) means 1 number*/0,1)+','+int.substr(1,3);//input=2310 result=2,310
                    int=int.substr(/*first argument is the index no. from where we want to start and the second number is how many characters we want (0,1) means 1 number*/0,int.length-3)+','+int.substr(int.length-3,3);//means ex=input=23100 from 0 means from 2 to length-3 means 5-3=2 so we will take 0 and 1 and then from 2 and then from 2 -1 ,2 and 3 means 100
                }
            //type==="exp"? sign='-':sign="+";
           // return sign+" "+int+decimal;
            //or
            return (type=="exp"?"-":"+")+" "+int+"."+decimal;
            
        };
     var nodeListForEach=function(list,callBack){//it will simply be a for loop that in each iteration is gonna call our callback function
           for(var i=0;i<list.length;i++){
               callBack(list[i],i/*current and the index*/);
           }
            
            
        };
    return{//returns an object and the object is having the method getInput inside it
        getInput:function(){
            return{
                type:document.querySelector(DOMStrings.inputType).value,//will be either inc or exp and the value that is in the add--type will be assigned to type
                description:document.querySelector(DOMStrings.inputDescription).value,
                value:parseFloat(document.querySelector(DOMStrings.inputValue).value)//we converted it to float as we cant perform caculations with the values in string
                
            }
        },
        addListItem:function(obj/*this is the same object that we created throught the function constructor and then passed to the controller module*/,type){
            var html,newHtml,element;
            //create a html string with placeholder text
            if(type==='inc'){
             element=DOMStrings.incomeContainer;//income container is a property of DOMStringsobject that conatins the class '.income__list't that is a container that holds the data that we want to see in UI
                html=/*for income*/'<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"> <i class="ion-ios-close-outline"></i> </button> </div> </div> </div>'
            }
            else{
                element=DOMStrings.expensesContainer;
            html=/*for expense*/'<div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'}
            //replace the placeholder text with some actual data
            newHtml=html/*as html is a string,we can use all the string methods*/.replace('%id%',obj.id);/*seaches for the string and than replaces the string with the data that we put into the method*/
            //we will not replace the html variable again because the first change we just did as done in the newHtml not in html
            newHtml=newHtml.replace('%description%',obj.description);
            newHtml=newHtml.replace('%value%',formatNumber(obj.value,type));
              //insert the html into the DOM which is done by selecting element on our webpage so from the DOM and then we can insert our HTML next to that
            //we are going to use insertadjacent html method that accepts the position and then the text or the string which in our case newHtml and there are 4 different positions where we can insert the html,
            /*<beforebegin>inserts the string just before the p element
            <p>
            <afterbegin>inserts the string just before any content of <p>
            nik
            <beforeend>inserts the elements just after the content of <p>
            </p>
            <afterend>inserts the elements just after the end of <p>
            */
            document.querySelector(element/*this is the class income__list or expenses__list*/).insertAdjacentHTML('beforeend',newHtml);//beforeend kewword makes it so that all the html will be inserted as a child of these container but as a last child
        },
        deleteListItem:function(selectorID)
        {
            var el=document.getElementById(selectorID);
        el.parentNode.removeChild(el);//we are selecting income-0 expense-0 like this then get its parentmethod and then deleted its child because it works in that way so of we want to delete an item then we have to select parent and then use removechild and pass the element that we wnt to delete in it    
        },
        clearFields:function()//we want when we give input and press enter key then the input that we gave disappears from the input field
        {var fields,fieldsArr;
            fields=/*holds the result of selection*/document.querySelectorAll(DOMStrings.inputDescription + ', ' +DOMStrings.inputValue);//this queryselector can select more than one elements and we are selecting two classes just like css but queryselector all returns a list but we need an array
           fieldsArr=Array.prototype.slice.call(fields/*this var will be set to fields and this ill trick the slice method into thinking that we give it an array so it will return an array*/);/*slice method is stored in the Array prototype property so Array is a function constructor for all arrays and we know all the methods that arrays inherit from the Array function constructor are in the Array's prototype property*/
         fieldsArr.forEach(function(/*can recieve upto 3 arguments in this case.so we have access to 3 things.1-current value that means the value of the array that is currenty being processed,2-index number that is going from 0 to length-1,3-entire array*/current,index,array){//we will pass the callback function into this method and then this callback function will be applied to each of the element of array 
             
            current.value="";
             
         });
         fieldsArr[0].focus();/*means that when the input is cleared then the typing cursor will be at the description field*/
        },
        displayBudget:function(obj/*we will pass the object that contains budget totalincome totalexpense percentage*/){
            obj.budget>0?type='inc':type="exp";
            document.querySelector(DOMStrings.budgetLabel).textContent/*we are assigning the content of obj.budget into the text content of the budget__value*/=formatNumber(obj.budget,type);
            document.querySelector(DOMStrings.expenseLabel).textContent=formatNumber(obj.totalExp,'exp');
            document.querySelector(DOMStrings.incomeLabel).textContent=formatNumber(obj.totalInc,'inc');
           
            if(obj.percentage>0)
                {
                  document.querySelector(DOMStrings.percentageLabel).textContent=obj.percentage + "%";   
                }
            else{
                 document.querySelector(DOMStrings.percentageLabel).textContent="---";
            }
        },
        displayPercentages:function(percentages){
            var fields=document.querySelectorAll/*we are using allquerySelctor because this time we dont how many the expense items will be on the list so we cant use queryselctor as it selects only one */(DOMStrings.expensePercLabel);//returns a node list because in the DOM tree where all the html elements of our page are stored,each element are called node and thats why the property that we used before for moving up in the DOM is called parentNode.Now we will loop over all these elements in our selections i.e. all of these nodes and then change the text content property for all of them
            
          
        nodeListForEach(fields,function(current,index){
        if(percentages[index]>0){
        current.textContent=percentages[index]+'%';}
    else{
        current.textContent='---';    }
    });
        } ,
        displayMonth:function(){
			console.log("ggggg");
            var now,year,month,months,day;
            now=new Date();//we are using the Date object constructor in order to save current date into a now var and if we dont pass anything in the date constructor then it would return the date of today
            //var chrsitmas=new Date(2016,11,25);//return this date
            year=now.getFullYear();//return the year ex 2019
            month=now.getMonth();
            months=['January','February','March','April','May','June','July','August','September','October','November','December'];
            day=now.getDay();
			console.log(month);
            document.querySelector(DOMStrings.dateLabel).textContent=day+" "+months[month]/*zero based so 0 will be january*/+" "+year;
            
        },
        changeType:function(){
          var fields=document.querySelectorAll(DOMStrings.inputType+","+DOMStrings.inputDescription+","+DOMStrings.inputValue);//returns node list
            
            nodeListForEach(fields,function(cur){
                //cur.classList.add('red-focus');//problem is that once the change event occurs,and this function here gets called,this red focus class will get added and will never be removed but we dont have the remove anywhere and using remove will not be ideal
                //toggle adds the redfocus class when it is not there and when it is there then removes it
                cur.classList.toggle('red-focus');
            })
            document.querySelector(DOMStrings.inputBtn).classList.toggle('red');//it will set the button to red if itis not red if change event happens and vice versa 
        },
        
        getDOMStrings:function(){
        
        return DOMStrings;//to return the DOMstrings to the public as the object returned by the IIFE will have the getDOMStrings method having object inside it
    }
    }
    
})();
//GLOBAL APP CONTROLLER
//this is the central place where we want to decide.Its the place where we want to control what  happens upon each event and then delegate these tasks to other controllers
var controller=(function(budgetCtrl,UICtrl){
    setupEventListeners=function(){//to setup the event listeners and it is private function and if we want to setup the eventlistener then this function need to be called
         var DOM=UICtrl.getDOMStrings();//this method will return DOMString object that we defined in IIFE on UICONTROLER and both are having the same properties now
        //to set up event listeners:-we first select an element and then attach it to the event listener
document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);
  // console.log("button was clicked");
//function gets executed as soon as the user clicks the button  
      document.addEventListener('keypress'/*this event occurs when any key is pressed except shift,fn,capslock*/,function(event/*this is going to pass into our event handler by the browser*/){
        /*we want event to happen when user press the enter key not the any key*/
       // console.log(event);/*when we press any button then we are printing the event i.e the object and it has the prototype keyboard event and this one has also the prototype which is the UI event so this means the keyboard event is a UI event and the keyboard object has a property keycode and a number and this number is what identifies the key that we pressed.all the keys have diff keycode*/ 
        /*we are not selecting.we will add this event listener to the global document and thats because this key press event doesnt happen on any specific element but it happe on the global web page*/
    if(event.keycode===13/*enter key*/|| event.which===13/*for older browser which dont have keycode property*/){
        
        ctrlAddItem();
    }
    })
        document.querySelector(DOM/*as we stored the valueof DOMString in DOM*/.container).addEventListener('click',ctrlDeleteItem);//we want this to happen if someone clicks the button somewhere in the container and we did it so because we want to do event delegation which means that instead of adding one eventlistener to all of the elements that we are interested in,like all the incomes and the expense items,we add them to the container and then let the event bubbling up
    document.querySelector(DOM.inputType).addEventListener('change',UICtrl.changeType);
    }
    var updateBudget=function(){//this function is called each time we enter a new item into the user interface
        //1.claculate the budget
        budgetCtrl.calculateBudget();
        //2.return the budget
        var budget=budgetCtrl.getBudget();/*returns an object that is having totalinc totalexp totalbudget and percentage as properties*/
        //3.display the budget on the user interface 
        //console.log(budget);//this appears each type we enter a new item
        UICtrl.displayBudget(budget);
    }
    var updatePercentages=function(){
        //1.calculate the percentages
        budgetCtrl.calculatePercentages();
        //2.Read the percentage from the budget controller
        var percentages=budgetCtrl.getPercentages();
        //3.update the UI with the new percentages
       UICtrl.displayPercentages(percentages);
    }
    var ctrlAddItem=function(){//it is the function that is called when the user hits the input button or enter button
        var input,newItem;
        
    //1.get the field input data
        input=UICtrl.getInput();//this will return an object and that object will be assigned to the input that contains the input that user gave
        console.log(input);//output-{type: "inc", description: "nik", value: "899"}
        if(input.description!="" && !isNaN(input.value)/*it is simply giving true if the number is not a not a number(NAN)*/ && input.value>0)
        {//2.add the new item to budgetcontroller
        newItem=budgetController.addItem(input.type,input.description,input.value);//using the input variable and the additem method,we created new item and returned it to newitem .these three values that we are passing to this function are the values that we get from the UI and these values are in the input object.this newitem will be passed to additem method
    //3.add the item to the ui
        UICtrl.addListItem(newItem,input.type);
        //4.clear the fields
        UICtrl.clearFields();
        //5.calculate and update budget
        updateBudget();
            //6.calculate and update the percentages
            updatePercentages();
        }
    }
        var ctrlDeleteItem=function(event/*the callback function of the add event listener method has always access to this event object and we can call it whatever we want and we need this event because we want to know what the target element is*/){//in event delegation, an event bubbles up and then we can know where it came from so where it was first fired by looking at the target property of the event
            var itemId,splitId,type,ID;
            //console.log(event.target//element where the event was fired//.parentNode.parentNode.parentNode.parentNode.id);//we want the parent element  of the target element but it will move one level up so if we want to move 2 or 3 level up,then we have to callparentnode property 3 times so we are basically traversing the DOM struture and by doing .id,we are accessing the id of that class
            itemId=event.target.parentNode.parentNode.parentNode.parentNode.id;
            if(itemId)//if exists
                {
                    //inc-1 we now need a way to split this up and there is a method in js that all strings have access to thats called split and by the statement that all string have access to the method. we always said string is primitive and not an object and the thing is that as soon as we  call one of these methods on string ,then js automatically puts a wrapper around then string and converts it from a primitive to an object and this object has access to a lot of string methods and same thing happens with number
                    splitId=itemId.split('-');/*var s='inc-1'
                                                undefined
                                                s.split('-')
                                                (2) ["inc", "1"] it breaks string when it finds -*/
                    type=splitId[0];//first element of array of splitId is type 
                    ID=parseInt(splitId[1]);//this ID contains Id in string format as it came from itemid sring 
                    //1.delete the item from the datas structure
                    budgetCtrl.deleteItem(type,ID);
                    //2.delete the item of the user interface
                    UICtrl.deleteListItem(itemId);
                    //3.update and show the new budget
                    updateBudget();
                    //4.calculate and update new percentages
                    updatePercentages();
                }
        };
        return {
            init:function(){//event listeners are going to be setup only when the init function is called as it calls the setupEventListener and IIFE returns an object having this method which is then initailised to the controller
                console.log("application has started hello");
                UICtrl.displayMonth();
                 UICtrl.displayBudget({
                     budget:5000,
                     totalExp:0,
                     totalInc:0,
                     percentage:-1

                 })/*this is the method that is called first so we want when we open our page then budget area will be displayed to 0 at the beginning*/
                setupEventListeners();
            }
        }
})(budgetController,UIController);
controller.init();//this means that we are calling the init() of controller object