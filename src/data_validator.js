/**
//Idea di classe che controlla la struttura datai strutturata come parser discendente
//https://code.tutsplus.com/tutorials/validating-data-with-json-schema-part-1--cms-25343
function data_validator(data) {
    this.data = data;
}

data_validator.prototype.check = function() {
    //TODO
    if(this.data.states) stateDefn(this.data.states);
    if(this.data.nbhdDefn) nbhdDefn(this.data.nbhdDefn);
    if(this.data.classes) classDefn(this.data.classes);    
  
    function stateDefn(data) {
        if(!data.state_id) throw new Error("state_id undefined");
        if(!(data.image || data.color)) throw new Error("image or color not defined");
        if(data.rules) rule(data.rules);
        else throw new Error("Undefined rules");
        if(class_list) classDefn(data.class_list);
    }

}
**/

{
    "name": "CellularAutomaton",
    "type": object,
    "properties"
    {
        
    }
    
    
    
}