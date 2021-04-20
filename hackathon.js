document.getElementById('tktbtn').onclick = function(){
    fetch('https://deepakpatil.freshdesk.com/api/v2/tickets',{
    headers: {'Authorization': 'Basic ' + btoa('j0nKGH9E4P6qAOM0sJ09:x')}})
    .then(res => res.json())
    .then(data => foo(data))
    .catch(err => console.log(err));
}

document.getElementById('contacts').onclick = function(){
    fetch('https://deepakpatil.freshdesk.com/api/v2/contacts',{
    headers: {'Authorization': 'Basic ' + btoa('j0nKGH9E4P6qAOM0sJ09:x')}})
    .then(res => res.json())
    .then(data => bar(data))
    .catch(err => console.log(err));
}

function bar(contacts){
    document.getElementById('row').innerHTML = ''
    console.log(contacts)
    let col = createEle('div','col-12 mb-4');
    let table = createEle('table','table');
    let theadtr = createEle('tr');
    let theadth1 = createEle('th');
    theadth1.scope = 'col';
    theadth1.innerHTML = '#'
    let theadth2 = createEle('th');
    theadth2.scope = 'col';
    theadth2.innerHTML = 'Name'
    let theadth3 = createEle('th');
    theadth3.scope = 'col';
    theadth3.innerHTML = 'Email'
    let theadth4 = createEle('th');
    theadth4.scope = 'col';
    theadth4.innerHTML = 'Phone'
    theadtr.append(theadth1,theadth2,theadth3,theadth4);
    table.append(theadtr);

    contacts.forEach((element,index) => {
        let tbodytr = createEle('tr');
        let tbodyth1 = createEle('th');
        tbodyth1.scope = 'row';
        tbodyth1.innerHTML = index+1;
        let theadtd1 = createEle('th');
        theadtd1.innerHTML = element.name;
        let theadtd2 = createEle('th');
        theadtd2.innerHTML = element.email;
        let theadtd3 = createEle('th');
        theadtd3.innerHTML = element.phone;
        tbodytr.append(tbodyth1,theadtd1,theadtd2,theadtd3);
        table.append(tbodytr);     
    });

    
    col.append(table);
    document.getElementById('row').append(col);
}

function foo(data){
    document.getElementById('row').innerHTML = ''
    console.log(data);
    data.forEach(obj => {
        let col = createEle('div','col-12 mb-4');
        let card = createEle('div','card');
        let cardbody = createEle('div','card-body');
        let cardtext1 = createEle('div','card-text');
        cardtext1.innerHTML = `Requester:  ${obj.requester_id}`;
        let cardtext2 = createEle('div','card-text');
        cardtext2.innerHTML = `Ticket Type:  ${obj.type}`;
        let cardtext3 = createEle('div','card-text');
        cardtext3.innerHTML = `Ticket Subject:   ${obj.subject}`;
        
        let cardtext4 = createEle('div','card-text');
        let select1 = createEle('select','drop');
        let label1 = createEle('label');
        label1.innerHTML = 'Ticket Status:'
        for(i=2; i<8;i++){
        let option1 = createEle('option');
        option1.value = i;
        option1.text = i;
        if(i==obj.status) option1.selected = 'selected';
        select1.append(option1);
    }

    select1.onchange = function(){
            postdata(obj.id,select1.value,'status');
   }
        
        let cardtext5 = createEle('div','card-text');
        let select2 = createEle('select','drop');
        let label2 = createEle('label');
        label2.innerHTML = 'Ticket Priority:'
        for(i=1; i<5;i++){
        let option2 = createEle('option');
        option2.value = i;
        option2.text = i;
        if(i==obj.priority) option2.selected = 'selected';
        select2.append(option2);
    }

    select2.onchange = function(){
            postdata(obj.id,select2.value,'priority');
    }
            cardtext4.append(label1,select1);
            cardtext5.append(label2,select2);
            cardbody.append(cardtext1,cardtext2,cardtext3,cardtext4,cardtext5);
            card.append(cardbody);
            col.append(card);
            document.getElementById('row').append(col);        
    });
}

function createEle(eleN,eleC){
    let element = document.createElement(eleN);
    element.setAttribute('class',eleC);
    return element;
}

function postdata(id,val,update) {
    let ext = '/'+id;
    if(update == 'status') data = {status:parseInt(val)};
    else if(update == 'priority') data = {priority:parseInt(val)};
    fetch('https://deepakpatil.freshdesk.com/api/v2/tickets'+ext,{
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {'Authorization': 'Basic ' + btoa('j0nKGH9E4P6qAOM0sJ09:x'),
    'Content-Type': 'application/json'}})
    .then(res => {if(res.status == 200) alert('Updated successfully!')})
    .catch(err => console.log(err));
}