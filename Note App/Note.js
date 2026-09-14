
let notesarray = JSON.parse(localStorage.getItem(
    'notes'
)) || []
const Title = document.getElementById('note_title');
const Note = document.getElementById('note_body')
const saved_bnt = document.getElementById('savekar_btn')
const saved_note = document.getElementById('note_container')

saved_bnt.addEventListener('click', function () {
    // 1. get current value 
    const titlevalue = Title.value
    const Notevalue = Note.value


    // 2. validation : Ensure user wrote something 
    if (titlevalue == '' || Notevalue == '') return alert(`plz write somththing in note or title body`);


    // storing the values of notes and title ot local storage so that after refresh the notes will not disappear
    const noteObject = {
        title: titlevalue,
        body: Notevalue
    }
    notesarray.push(noteObject);
    localStorage.setItem('notes', JSON.stringify(notesarray));




    // 3. Create element 
    const noteCard = document.createElement('div');
    noteCard.classList.add('note-card')

    // 4. Create a sturucture 
    noteCard.innerHTML = `
    <h3> ${titlevalue} </h3>
    <p> ${Notevalue} </p>
    <button class="Delete_btn"> DELETE NOTE </button> `;

    //5. Append to container
    saved_note.appendChild(noteCard);


    // calling the display fucntion so that the notes will stay stored in local storage 
    displayNotes();

    //6. Clear input fields
    Title.value = '';
    Note.value = '';


});


function displayNotes() {
    saved_note.innerHTML = ''
    notesarray.forEach(function (note, index) {
        const noteCard = document.createElement('div')
        noteCard.classList.add('note-card')
        noteCard.innerHTML = `
        <h3> ${note.title} </h3>
        <p> ${note.body} </p>
    <button class="Delete_btn"> DELETE NOTE </button> `

        const delBtn = noteCard.querySelector('.Delete_btn')
        delBtn.addEventListener('click', function () {
            notesarray.splice(index, 1);
            localStorage.setItem('notes', JSON.stringify(notesarray))
            displayNotes();
        })

        saved_note.append(noteCard);
    });
}

displayNotes();

