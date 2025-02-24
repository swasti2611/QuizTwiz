import axios from "../axioxInstance";
import sendErrorToDiscord from "./Error";
const sendData = async () => {
  console.log("inside sendata");
  let resolved = {
    data: null,
    error: null,
  };
  try {
    const res = await axios.post("data/question3");
    console.log("res");

    resolved.data = res.data;
    console.log(resolved);
  } catch (error) {
    resolved.error = {
      message: error,
    };
    console.error(error);
  }
};

const getCategories = async (id = null) => {
  let resolved = {
    data: null,
    error: null,
  };
  try {
    const res = await axios({
      url: id == null ? `question/categories` : `question/categories?id=${id}`,
      method: "GET",
      headers: {
        // "userid": userData ? userData._id : null
      },
      withCredentials: true,
    });
    resolved.data = res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      resolved.error = err.response.data;
    } else {
      resolved.error = {
        message: "SomeThing went Wrong",
      };
    }
  }
  await sendErrorToDiscord(err, `getCategories`);
  return resolved;
};

const addCategory = async (newCategoryObject) => {
  let resolved = {
    data: null,
    error: null,
  };

  let formData = new FormData();
  formData.append("name", newCategoryObject.name);
  formData.append("file", newCategoryObject.imgFile);
  console.log(newCategoryObject);

  try {
    const res = await axios({
      url: `question/add_category`,
      method: "POST",
      headers: {
        // "userid": userData ? userData._id : null

        "Content-type": "multipart/form-data",
      },
      data: formData,
      withCredentials: true,
    });
    resolved.data = res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      resolved.error = err.response.data;
    } else {
      resolved.error = {
        message: "SomeThing went Wrong",
      };
    }
  }

  return resolved;
};

const editCategory = async (id, categoryObjectToReplaceWith, userId = null) => {
  let resolved = {
    data: null,
    error: null,
  };

  let formData = new FormData();
  formData.append("name", categoryObjectToReplaceWith.name);
  formData.append("file", categoryObjectToReplaceWith.imgFile);

  try {
    const res = await axios({
      url: `question/edit_category?id=${id}`,
      method: "POST",
      headers: {
        userid: userId,
      },
      withCredentials: true,
      data: formData,
    });
    resolved.data = res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      resolved.error = err.response.data;
    } else {
      resolved.error = {
        message: "SomeThing went Wrong",
      };
    }
  }
};

const removeCategory = async (id, userId = null) => {
  let resolved = {
    data: null,
    error: null,
  };
  try {
    const res = await axios({
      url: `question/category?id=${id}`,
      method: "DELETE",
      headers: {
        userid: userId,
      },
      withCredentials: true,
    });
    resolved.data = res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      resolved.error = err.response.data;
    } else {
      resolved.error = {
        message: "SomeThing went Wrong",
      };
    }
  }

  return resolved;
};

const getQuizzes = async (id = null, category = null) => {
  let resolved = {
    data: null,
    error: null,
  };
  try {
    const res = await axios({
      url:
        id != null
          ? `question/quizzes?id=${id}`
          : category != null
          ? `question/quizzes?category=${category}`
          : `question/quizzes`,
      method: "GET",
      headers: {
        // "userid": userData ? userData._id : null
      },
      withCredentials: true,
    });
    resolved.data = await res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      resolved.error = err.response.data;
    } else {
      resolved.error = {
        message: "SomeThing went Wrong",
      };
    }
    await sendErrorToDiscord(err, `getQuizzes - Quiz`);
  }

  return resolved;
};

const addQuiz = async (newCategoryObject) => {
  let resolved = {
    data: null,
    error: null,
  };

  let formData = new FormData();
  let promise = Object.keys(newCategoryObject).map((key) => {
    if (key == "imgFile") {
      formData.append("file", newCategoryObject[key]);
    } else {
      formData.append(key, newCategoryObject[key]);
    }
  });
  await Promise.all(promise);

  try {
    const res = await axios({
      url: `question/add_quiz`,
      method: "POST",
      headers: {
        // "userid": userData ? userData._id : null
      },
      data: formData,
      withCredentials: true,
    });
    resolved.data = res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      resolved.error = err.response.data;
    } else {
      resolved.error = {
        message: "SomeThing went Wrong",
      };
    }
  }

  return resolved;
};

const editQuiz = async function (
  id,
  categoryObjectToReplaceWith,
  userId = null
) {
  let resolved = {
    data: null,
    error: null,
  };

  let formData = new FormData();
  let promise = Object.keys(categoryObjectToReplaceWith).map((key) => {
    if (key == "imgFile") {
      formData.append("file", categoryObjectToReplaceWith[key]);
    } else {
      formData.append(key, categoryObjectToReplaceWith[key]);
    }
  });
  await Promise.all(promise);

  try {
    const res = await axios({
      url: `question/edit_category?id=${id}`,
      method: "POST",
      headers: {
        userid: userId,
      },
      withCredentials: true,
      data: formData,
    });
    resolved.data = res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      resolved.error = err.response.data;
    } else {
      resolved.error = {
        message: "SomeThing went Wrong",
      };
    }
  }
};

const removeQuiz = async function (id, userId = null) {
  let resolved = {
    data: null,
    error: null,
  };
  try {
    const res = await axios({
      url: `question/quiz?id=${id}`,
      method: "DELETE",
      headers: {
        userid: userId,
      },
      withCredentials: true,
    });
    resolved.data = res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      resolved.error = err.response.data;
    } else {
      resolved.error = {
        message: "SomeThing went Wrong",
      };
    }
  }

  return resolved;
};

const cutFee = async (id, fee) => {
  let resolved = {
    data: null,
    error: null,
  };
  try {
    const res = await axios({
      url: `question/cut_fee`,
      method: "POST",
      data: {
        fee,
      },
      headers: {
        // Authorization: logedIn == "true" ? `Bearer ${token}` : null
        userid: id,
      },
      withCredentials: true,
    });
    resolved.data = res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      resolved.error = err.response.data;
    } else {
      resolved.error = {
        message: "SomeThing went Wrong",
      };
    }
  }

  return resolved;
};

const getQuestions = async (
  id = null,
  quiz = null,
  userId = null,
  start = false,
  quizName
) => {
  let resolved = {
    data: null,
    error: null,
  };
  try {
  
    if (start && quizName) {
      const res = await axios({
        url: `question/?start=true&quizName=${quizName}`,
        method: "GET",
        headers: {
          // "userid": userData ? userData._id : null
        },
        withCredentials: true,
      });
      resolved.data = await res.data;
    } else if (start && !quizName) {
      const res = await axios({
        url: `question/?start=true`,
        method: "GET",
        headers: {
          // "userid": userData ? userData._id : null
        },
        withCredentials: true,
      });
      resolved.data = await res.data;
    } else {
      const res = await axios({
        url: quiz != null ? `question/?quiz=${quiz}` : `question/`,
        method: "GET",
        headers: {
          // "userid": userData ? userData._id : null
        },
        withCredentials: true,
      });
      resolved.data = await res.data;
    }
  } catch (err) {
    if (err.response && err.response.data) {
      resolved.error = err.response.data;
    } else {
      resolved.error = {
        message: "SomeThing went Wrong",
      };
    }
    await sendErrorToDiscord(err, `getQuestions - Quiz: ${quizName || "N/A"}`);
  }
  return resolved;
};

const addQuestion = async (newQuestionObject, userId = null) => {
  let resolved = {
    data: null,
    error: null,
  };
  try {
    const res = await axios({
      url: `question/add_question`,
      method: "POST",
      headers: {
        userid: userId,
      },
      data: newQuestionObject,
      withCredentials: true,
    });
    resolved.data = res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      resolved.error = err.response.data;
    } else {
      resolved.error = {
        message: "SomeThing went Wrong",
      };
    }
  }
  return resolved;
};

const editQuestion = async (id, QuestionObjectToReplaceWith, userId = null) => {
  let resolved = {
    data: null,
    error: null,
  };
  try {
    const res = await axios({
      url: `question/edit_question?id=${id}`,
      method: "POST",
      headers: {
        userid: userId,
      },
      data: QuestionObjectToReplaceWith,
      withCredentials: true,
    });
    resolved.data = res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      resolved.error = err.response.data;
    } else {
      resolved.error = {
        message: "SomeThing went Wrong",
      };
    }
  }
  return resolved;
};

const removeQuestion = async (id, userId = null) => {
  let resolved = {
    data: null,
    error: null,
  };
  try {
    const res = await axios({
      url: `question/?id=${id}`,
      method: "DELETE",
      headers: {
        userid: userId,
      },
      withCredentials: true,
    });
    resolved.data = res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      resolved.error = err.response.data;
    } else {
      resolved.error = {
        message: "SomeThing went Wrong",
      };
    }
  }
  return resolved;
};

const checkQuestion = async (id, correct, userId = null) => {
  let resolved = {
    data: null,
    error: null,
  };
  try {
    const res = await axios({
      url: `question/check_question`,
      method: "POST",
      headers: {
        userid: userId,
      },
      data: {
        id,
        correct,
      },
      withCredentials: true,
    });
    resolved.data = res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      resolved.error = err.response.data;
    } else {
      resolved.error = {
        message: "SomeThing went Wrong",
      };
    }
  }
  return resolved;
};

const checkRank = async (userId) => {
  let resolved = {
    data: null,
    error: null,
  };
  try {
    const res = await axios({
      url: `question/check_rank`,
      method: "GET",
      headers: {
        userid: userId,
      },
      withCredentials: true,
    });
    resolved.data = res.data;
  } catch (err) {
    if (err.response && err.response.data) {
      resolved.error = err.response.data;
    } else {
      resolved.error = {
        message: "SomeThing went Wrong",
      };
    }
  }
  return resolved;
};

export {
  getCategories,
  editCategory,
  addCategory,
  removeCategory,
  getQuizzes,
  editQuiz,
  removeQuiz,
  cutFee,
  getQuestions,
  addQuestion,
  editQuestion,
  removeQuestion,
  checkQuestion,
  checkRank,
  sendData,
};
