const sum = require("./sum");

test("sum", () => {
  expect(sum(1, 2)).toBe(3);
});

test("object assignment", () => {
  const data = { one: 1 };
  data["two"] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});

function fetchData(willFail = false) {
  return new Promise((resolve, reject) => {
    if (willFail) {
      // 如果条件满足，则拒绝 Promise 并抛出一个错误
      reject("error");
    } else {
      // 如果条件不满足，则解决 Promise 并返回一些数据
      resolve("peanut butter");
    }
  });
}

test("测试异步1", () => {
  return fetchData(false).then((data) => {
    expect(data).toBe("peanut butter");
  });
});

test("测试异步2", async () => {
  const data = await fetchData(false);
  expect(data).toBe("peanut butter");
});

test("测试异步是否抛出错误", async () => {
  expect.assertions(1);
  try {
    await fetchData(true);
  } catch (e) {
    expect(e).toMatch("error");
  }
});

function fetchDataCallback(callback) {
  // 模拟异步操作，比如网络请求
  setTimeout(() => {
    // 假设这是从某个源获取的数据
    const data = "peanut butter";

    // 没有错误，所以传递 null 作为错误对象
    callback(null, data);
  }, 1000); // 延迟1秒以模拟异步行为
}

test("the data is peanut butter", (done) => {
  function callback(error, data) {
    if (error) {
      done(error);
      return;
    }
    try {
      expect(data).toBe("peanut butter");
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchDataCallback(callback);
});
