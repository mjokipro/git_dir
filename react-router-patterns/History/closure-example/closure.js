function justScope() {
  const secret = 42;

  function shareSecret() {
    return secret;
  }

  return shareSecret();
}

justScope(); // 42

function closureExample() {
  const secret = 42;

  function shareSecret() {
    return secret;
  }

  return shareSecret;
}

let shareFn = closureExample();
shareFn(); // 42

function shareSecret() {
  return secret;
}

shareSecret(); // ReferenceError: secret is not defined

function changeableSecret() {
  let secret = 42;

  function shareSecret() {
    return secret;
  }

  function changeSecret(newSecret) {
    secret = newSecret;
  }

  return { shareSecret, changeSecret };
}

let shh = changeableSecret();
shh.shareSecret(); // 42
shh.changeSecret(43);
shh.shareSecret(); 42