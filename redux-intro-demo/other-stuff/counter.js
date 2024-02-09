window.onload = function() {
  const counterElement = document.querySelector("h1");

  document.querySelector("#increment")
      .addEventListener("click", function () {
        store.dispatch({ type: "INCREMENT" });
        const currentCount = store.getState().count;
        counterElement.innerText = currentCount;
  });

  document.querySelector("#decrement")
      .addEventListener("click", function () {
        store.dispatch({ type: "DECREMENT" });
        const currentCount = store.getState().count;
        counterElement.innerText = currentCount;
  });
}
