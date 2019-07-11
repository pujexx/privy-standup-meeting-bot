const {App} = require('../../core/App')

const weekNames = ['Su','Mo','Tu','We', 'Th','Fr','Sa']
class CalendarKeyboard extends App {
    constructor(prefix){
        super()
        this.prefix = prefix
        this.date = new Date()
    }
    
    isMethodExist(name){
        return ((name in this) && (this[name] instanceof Function))
    }

    register(name){
        if(!this.isMethodExist(name))
            throw new Error(`${this.constructor.name} doesn't have method '${name}'`)

        if(!this.lookUp.has(name))
            super.register([name])
    }

    makeDay(text, action='select', args=''){
        this.register(action)
        return {
            text: text,
            callback_data: `${this.prefix}-${action}-${args}`
        }
    }

    makeCal(month,start){
        const calls = [[...weekNames]]
        let numWeek = Math.ceil((this.getMaxDay(month)+start)/7)
        const prev = this.getMaxDay(month-1)
        const first = []
        let counter = 1
        if(start>0 && start<7){
            for(let i=start; i> 0;i--)
                first.push(prev+1-i)
            
            while(first.length!=7){
                first.push(counter)
                counter++
            }
            
            calls.push(first)
            numWeek--
        }
        let temp = []
        const numDay = this.getMaxDay(month)
        while(numWeek>0){
            if(temp.length==7){
                calls.push(temp)
                numWeek--
                temp=[]
            }
            temp.push(counter) 
            counter = counter==numDay? 0 : counter
            counter++
        }
        console.table(calls)
    }

    select(){

    }

    choose(){

    }

    getMaxDay(month){
        const year = this.date.getFullYear()
        if(month==2) return year%4 == 0 ? 29 : 28
        if(month<=7) return month%2 == 1? 31 : 30
        return month%2 == 1 ? 30 : 31
    }

}


const  c =  new CalendarKeyboard('A')
c.makeCal(7,1)
c.makeCal(8,4)
c.makeCal(9,0)