// alert("I am here")
console.debug("I am here")
console.log("I am here yoyoyu")
console.log("Hello")

$(".delete-todo").click(function () {
    const id = $(this).data('id');
    console.log("You clicked", id);
    console.debug("YOU CLICKED!!!");
})

async function deleteTodo() {
    const id = $(this).data('id')
    await axios.delete(`/api/todos/${ id }`)
    $(this).parent().remove()
    console.log("you clicked")
}

// const delto = document.addEventListener("click", function(e) {
//     e.preventDefault()
//     console.log("You clicked", id);
//     console.debug("YOU CLICKED!!!");
// })