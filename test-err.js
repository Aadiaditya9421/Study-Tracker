const run = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({name: 'test5', email: 'test5@test.com', password: 'password123'}),
      headers: {'Content-Type': 'application/json'}
    });
    const data = await res.json();
    console.log("ERROR MESSAGE:", data.error);
    console.log("STACK:", data.stack);
  } catch(e) {
    console.log(e);
  }
};
run();
