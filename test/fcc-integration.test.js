const { assert } = require("chai");
const fetch = require("node-fetch")

describe("freeCodeCamp Project Passing Tests", () => {

  const url = "http://localhost:3002";

  beforeEach( done => setTimeout(done, 300) );

  it(" You can POST to /api/users with form data username to create a new user.", async () => {

      const res = await fetch(url + '/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `username=fcc_test_${Date.now()}`
      });
      assert.isTrue(res.ok);
      if(!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
      };

  })

  it("The returned response from POST /api/users with form data username will be an object with username and _id properties.", async () => {
    const res = await fetch(url + '/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `username=fcc_test_${Date.now()}`
    });
    if (res.ok) {
      const { _id, username } = await res.json();
      assert.exists(_id);
      assert.exists(username);
    } else {
      throw new Error(`${res.status} ${res.statusText}`);
    }
  });


  it("You can make a GET request to /api/users to get a list of all users.", async () => {
    const res = await fetch(url + '/api/users');
    assert.isTrue(res.ok);
    if(!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`)
    };
  })


  it("The GET request to /api/users returns an array.", async () => {
    const res = await fetch(url + '/api/users');
    if(res.ok){
      const users = await res.json();
      assert.isArray(users);
    } else {
      throw new Error(`${res.status} ${res.statusText}`);
    };
  })


  it("Each element in the array returned from GET /api/users is an object literal containing a user's username and _id.", async () => {
    const res = await fetch(url + '/api/users');
    if(res.ok){
      const users = await res.json();
      const user = users[0];
      assert.exists(user);
      assert.exists(user.username);
      assert.exists(user._id);
      assert.isString(user.username);
      assert.isString(user._id);
    } else {
      throw new Error(`${res.status} ${res.statusText}`);
    };

  })


  it("You can POST to /api/users/:_id/exercises with form data description, duration, and optionally date. If no date is supplied, the current date will be used.", async () => {

    const res = await fetch(url + '/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `username=fcc_test_${Date.now()}`
    });
    if (res.ok) {
      const { _id, username } = await res.json();
      const expected = {
        username,
        description: 'test',
        duration: 60,
        _id,
        date: 'Mon Jan 01 1990'
      };
      const addRes = await fetch(url + `/api/users/${_id}/exercises`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `description=${expected.description}&duration=${expected.duration}&date=1990-01-01`
      });
    assert.isTrue(addRes.ok);
    if(!addRes.ok) {

      throw new Error(`${addRes.status} ${addRes.statusText}`)
    };
    } else {
      throw new Error(`${res.status} ${res.statusText}`);
    }


  })




  it("The response returned from POST /api/users/:_id/exercises will be the user object with the exercise fields added.", async () => {

    const res = await fetch(url + '/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `username=fcc_test_${Date.now()}`
    });
    if (res.ok) {
      const { _id, username } = await res.json();
      const expected = {
        username,
        description: 'test',
        duration: 60,
        _id,
        date: 'Mon Jan 01 1990'
      };
      const addRes = await fetch(url + `/api/users/${_id}/exercises`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `description=${expected.description}&duration=${expected.duration}&date=1990-01-01`
      });
      if (addRes.ok) {
        const actual = await addRes.json();
        assert.deepEqual(actual, expected);
        assert.isString(actual.description);
        assert.isNumber(actual.duration);
        assert.isString(actual.date);
      } else {
        throw new Error(`${addRes.status} ${addRes.statusText}`);
      }
    } else {
      throw new Error(`${res.status} ${res.statusText}`);
    }

  })


  it("You can make a GET request to /api/users/:_id/logs to retrieve a full exercise log of any user.", async () => {
    const res = await fetch(url + '/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `username=fcc_test_${Date.now()}`
    });
    if (res.ok) {
      const { _id, username } = await res.json();
      const expected = {
        username,
        description: 'test',
        duration: 60,
        _id,
        date: new Date().toDateString()
      };
      const addRes = await fetch(url + `/api/users/${_id}/exercises`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `description=${expected.description}&duration=${expected.duration}`
      });
      if (addRes.ok) {
        const logRes = await fetch(url + `/api/users/${_id}/logs`);
      assert.isTrue(logRes.ok);
      if(!logRes.ok) {
        throw new Error(`${logRes.status} ${logRes.statusText}`)
      };
      } else {
        throw new Error(`${addRes.status} ${addRes.statusText}`);
      }
    } else {
      throw new Error(`${res.status} ${res.statusText}`);
    }

  })


  it("A request to a user's log GET /api/users/:_id/logs returns a user object with a count property representing the number of exercises that belong to that user.", async () => {

    const res = await fetch(url + '/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `username=fcc_test_${Date.now()}`
    });
    if (res.ok) {
      const { _id, username } = await res.json();
      const expected = {
        username,
        description: 'test',
        duration: 60,
        _id,
        date: new Date().toDateString()
      };
      const addRes = await fetch(url + `/api/users/${_id}/exercises`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `description=${expected.description}&duration=${expected.duration}`
      });
      if (addRes.ok) {
        const logRes = await fetch(url + `/api/users/${_id}/logs`);
        if (logRes.ok) {
          const { count } = await logRes.json();
          assert(count);
        } else {
          throw new Error(`${logRes.status} ${logRes.statusText}`);
        }
      } else {
        throw new Error(`${addRes.status} ${addRes.statusText}`);
      }
    } else {
      throw new Error(`${res.status} ${res.statusText}`);
    }


  })

  it("A GET request to /api/users/:_id/logs will return the user object with a log array of all the exercises added.", async () => {

    const res = await fetch(url + '/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `username=fcc_test_${Date.now()}`
    })
    if(res.ok){
      const {_id, username} = await res.json();
      const expected = {
        username,
        description: 'test',
        duration: 60,
        _id,
        date: new Date().toDateString()
      };
      const addRes = await fetch(url + `/api/users/${_id}/exercises`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `description=${expected.description}&duration=${expected.duration}`
      });
      if(addRes.ok){
        const logRes = await fetch(url + `/api/users/${_id}/logs`);
        if(logRes.ok) {
          const {log} = await logRes.json();
          assert.isArray(log);
          assert.equal(1, log.length);
        } else {
          throw new Error(`${logRes.status} ${logRes.statusText}`);
        }
      } else {
        throw new Error(`${addRes.status} ${addRes.statusText}`);
      };
    } else {
      throw new Error(`${res.status} ${res.statusText}`)
    };

  })



  it("Each item in the log array that is returned from GET /api/users/:_id/logs is an object that should have a description, duration, and date properties.", async () => {

    const res = await fetch(url + `/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `username=fcc_test_${Date.now()}`
    });
    if(res.ok) {
      const {_id, username} = await res.json();
       const expected = {
        username,
        description: 'test',
        duration: 60,
        _id,
        date: new Date().toDateString()
      };
      const addRes = await fetch(url + `/api/users/${_id}/exercises`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `description=${expected.description}&duration=${expected.duration}`
      });
      if(addRes.ok) {
        const logRes = await fetch(url + `/api/users/${_id}/logs`);
        if(logRes.ok) {
          const {log} = await logRes.json();
          const exercise = log[0];
          assert.exists(exercise);
          assert.exists(exercise.description);
          assert.exists(exercise.duration);
          assert.exists(exercise.date);
        } else {
          throw new Error(`${logRes.status} ${logRes.statusText}`);
        };
      } else {
        throw new Error(`${addRes.status} ${addRes.statusText}`);
      };
    } else {
      throw new Error(`${res.status} ${res.statusText}`)
    };

  })


  it("The description property of any object in the log array that is returned from GET /api/users/:_id/logs should be a string.", async () => {

    const res = await fetch(url + '/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=fcc_test_${Date.now()}`.substring(0,29)
    });
    if(res.ok) {
      const {_id, username} = await res.json();
      const expected = {
        username,
        description: 'test',
        duration: 60,
        _id,
        date: new Date().toDateString()
      };
      const addRes = await fetch(url + `/api/users/${_id}/exercises`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `description=${expected.description}&duration=${expected.duration}`
      });
      if(addRes.ok) {
        const logRes = await fetch(url + `/api/users/${_id}/logs`);
        if(logRes.ok){
          const {log} = await logRes.json();
          const exercise = log[0];
          assert.isString(exercise.description);
          assert.equal(exercise.description, expected.description);
        } else {
          throw new Error(`${logRes.status} ${logRes.statusText}`);
        }
      } else {
        throw new Error(`${addRes.status} ${addRes.statusText}`);
      };
    } else {
      throw new Error(`${res.status} ${res.statusText}`);
    };

  })


  it("The duration property of any object in the log array that is returned from GET /api/users/:_id/logs should be a number.", async () => {
    
    const res = await fetch(url + '/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=fcc_test_${Date.now()}`.substring(0,29)
    });
    if(res.ok) {
      const {_id, username} = await res.json();
      const expected = {
        username,
        description: 'test',
        duration: 60,
        _id,
        date: new Date().toDateString()
      };
      const addRes = await fetch(url + `/api/users/${_id}/exercises`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `description=${expected.description}&duration=${expected.duration}`
      });
      if(addRes.ok) {
        const logRes = await fetch(url + `/api/users/${_id}/logs`);
        if(logRes.ok){
          const {log} = await logRes.json();
          const exercise = log[0];
          assert.isNumber(exercise.duration);
          assert.equal(exercise.duration, expected.duration);
        } else {
          throw new Error(`${logRes.status} ${logRes.statusText}`);
        }
      } else {
        throw new Error(`${addRes.status} ${addRes.statusText}`);
      };
    } else {
      throw new Error(`${res.status} ${res.statusText}`);
    };

  })


  it("The date property of any object in the log array that is returned from GET /api/users/:_id/logs should be a string. Use the dateString format of the Date API.", async () => {
    
    const res = await fetch(url + '/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=fcc_test_${Date.now()}`.substring(0,29)
    });
    if(res.ok) {
      const {_id, username} = await res.json();
      const expected = {
        username,
        description: 'test',
        duration: 60,
        _id,
        date: new Date().toDateString()
      };
      const addRes = await fetch(url + `/api/users/${_id}/exercises`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `description=${expected.description}&duration=${expected.duration}`
      });
      if(addRes.ok) {
        const logRes = await fetch(url + `/api/users/${_id}/logs`);
        if(logRes.ok){
          const {log} = await logRes.json();
          const exercise = log[0];
          assert.isString(exercise.date);
          assert.equal(exercise.date, expected.date);
        } else {
          throw new Error(`${logRes.status} ${logRes.statusText}`);
        }
      } else {
        throw new Error(`${addRes.status} ${addRes.statusText}`);
      };
    } else {
      throw new Error(`${res.status} ${res.statusText}`);
    };

  })

  it("You can add from, to and limit parameters to a GET /api/users/:_id/logs request to retrieve part of the log of any user. from and to are dates in yyyy-mm-dd format. limit is an integer of how many logs to send back.", async () => {

    const res = await fetch(url + '/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `username=fcc_test_${Date.now()}`
    });
    if (res.ok) {
      const { _id, username } = await res.json();
      const expected = {
        username,
        description: 'test',
        duration: 60,
        _id,
        date: new Date().toDateString()
      };
      const addExerciseRes = await fetch(url + `/api/users/${_id}/exercises`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `description=${expected.description}&duration=${expected.duration}&date=1990-01-01`
      });
      const addExerciseTwoRes = await fetch(url + `/api/users/${_id}/exercises`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `description=${expected.description}&duration=${expected.duration}&date=1990-01-03`
      });
      if (addExerciseRes.ok && addExerciseTwoRes.ok) {
        const logRes = await fetch(
          url + `/api/users/${_id}/logs?from=1989-12-31&to=1990-01-04`
        );
        if (logRes.ok) {
          const { log } = await logRes.json();
          assert.isArray(log);
          assert.equal(2, log.length);
        } else {
          throw new Error(`${logRes.status} ${logRes.statusText}`);
        }
        const limitRes = await fetch(
          url + `/api/users/${_id}/logs?limit=1`
        );
        if (limitRes.ok) {
          const { log } = await limitRes.json();
          assert.isArray(log);
          assert.equal(1, log.length);
        } else {
          throw new Error(`${limitRes.status} ${limitRes.statusText}`);
        }
        const filterDateBeforeLimitRes = await fetch(
          url + `/api/users/${_id}/logs?from=1990-01-02&to=1990-01-04&limit=1`
        );
        if (filterDateBeforeLimitRes.ok) {
          const { log } = await filterDateBeforeLimitRes.json();
          assert.isArray(log);
          assert.equal(1, log.length);
        } else {
          throw new Error(`${filterDateBeforeLimitRes.status} ${filterDateBeforeLimitRes.statusText}`);
        }
      } else {
        throw new Error(`${res.status} ${res.statusText}`);
      }
    } else {
      throw new Error(`${res.status} ${res.statusText}`);
    }

  })

})