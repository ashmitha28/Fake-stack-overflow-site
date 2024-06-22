// Setup database with initial test data.
const mongoose = require("mongoose");
let Tag = require('./models/tags')
let Answer = require('./models/answers')
let Question = require('./models/questions')
let Comment = require('./models/comments')
let User = require('./models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { MONGO_URL } = require("./config");

//mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully');
        init().catch(err => {
            console.error("ERROR: " + err);
            mongoose.connection.close();
        });
    })
    .catch(err => {
        console.error("Failed to connect to MongoDB", err);
    });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
let tags = [];
let answers = [];
const secretKey = process.env.JWT_SECRET || '12345678';

function tagCreate(name) {
    let tag = new Tag({ name: name });
    return tag.save();
}

async function answerCreate(text, ans_by, ans_date_time, comments) {
    answerdetail = { text: text };
    if (ans_by != false) answerdetail.ans_by = ans_by;
    if (ans_date_time != false) answerdetail.ans_date_time = ans_date_time;
    answerdetail.activity_date_time = ans_date_time;
    if (comments != false) answerdetail.comments = comments;

    let answer = new Answer(answerdetail);

    // Save the answer to the user's answers array
    const status = await User.findOneAndUpdate(
        { username: ans_by },
        { $push: { answers: answer._id } },
        { new: true },
    );

    return answer.save();
}

async function questionCreate(title, text, tags, answers, asked_by, ask_date_time, views, comments) {
    qstndetail = {
        title: title,
        text: text,
        tags: tags,
        asked_by: asked_by,
        votes: 0
    }
    if (answers != false) qstndetail.answers = answers;
    if (comments != false) qstndetail.comments = comments;

    var latestDate = ask_date_time;
    // Check if the answers array is not empty
    if (answers && answers.length > 0) {
        // Use the reduce function to find the answer with the latest ans_date_time
        const latestAnswer = answers.reduce((latest, current) => {
            const currentDate = new Date(current.ans_date_time);
            const latestDate = latest ? new Date(latest.ans_date_time) : null;

            // Compare dates and update the latest answer if current is newer
            if (!latestDate || currentDate > latestDate) {
                return current;
            }

            return latest;
        }, null);

        // Now latestAnswer contains the answer with the latest ans_date_time
        if (latestAnswer) {
            latestDate = new Date(latestAnswer.ans_date_time);
        }
    }

    if (ask_date_time != false) qstndetail.ask_date_time = ask_date_time;
    qstndetail.activity_date_time = latestDate;
    if (views != false) qstndetail.views = views;

    let qstn = await new Question(qstndetail);

    // Save the question to the user's questions array
    const status = await User.findOneAndUpdate(
        { username: asked_by },
        { $push: { questions: qstn._id } },
        { new: true },
    );
    //console.log(status);

    return qstn.save();
}

async function commentCreate(text, username) {
    const created_date = new Date();
    commentdetail = { text: text, comment_date_time: created_date, comment_by: username, activity_date_time: created_date };
    let comment = new Comment(commentdetail);

    // Save the comment to the user's comments array
    const status = await User.findOneAndUpdate(
        { username: username },
        { $push: { comments: comment._id } },
        { new: true },
    );

    return comment.save();
}


async function userCreate(username, email, password, rep_score) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userDetail = { username: username, password: hashedPassword, email: email, rep_score: rep_score };

    console.log(userDetail);
    const user = new User(userDetail);

    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
    user.token = token;

    return user.save();
}

const wait = (n) => new Promise((resolve) => setTimeout(resolve, n));

const init = async () => {
    await wait(5000);
    let u1 = await userCreate("elephantCDE", "elephantCDE@gmail.com", "123", 0);
    let u2 = await userCreate("monkeyABC", "monkeyABC@gmail.com", "123", 30);
    let u3 = await userCreate("tigerABC", "tigerABC@gmail.com", "123", 55);
    let u4 = await userCreate("saltyPeter", "saltyPeter@gmail.com", "123", 100);
    let u5 = await userCreate("lionABC", "lionABC@gmail.com", "123", 20);
    let u6 = await userCreate("Joji John", "Joji John@gmail.com", "123", 100);
    let u7 = await userCreate("armand", "armand@m.com", "333", 60);
    let u8 = await userCreate("ashmitha", "ashmitha@gmail.com", "333", 60)

    let t1 = await tagCreate('react');
    let t2 = await tagCreate('javascript');
    let t3 = await tagCreate('android-studio');
    let t4 = await tagCreate('shared-preferences');
    let t5 = await tagCreate('storage');
    let t6 = await tagCreate('website');
    let t7 = await tagCreate('Flutter');
    let t8 = await tagCreate('Flask');

    let c1 = await commentCreate('this answer is good', u1.username);
    let c2 = await commentCreate('this question is good', u1.username);
    let c3 = await commentCreate('this question is not good', u2.username);
    let c4 = await commentCreate('Bad question', u2.username);
    let c5 = await commentCreate('nice question', u3.username);
    let c6 = await commentCreate('very nice', u4.username);
    let c7 = await commentCreate('ohohoho awesome', u5.username);
    let c8 = await commentCreate('perfect, its amazing!', u6.username);

    let a1 = await answerCreate('React Router is mostly a wrapper around the history library. history handles interaction with the browser\'s window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don\'t have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.', u7.username, new Date('2023-11-20T03:24:42'), [c1, c2, c3, c4]);
    let a2 = await answerCreate('On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn\'t change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.', u1.username, new Date('2023-11-23T08:24:00'));
    let a3 = await answerCreate('Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background.', u2.username, new Date('2023-11-18T09:24:00'));
    let a4 = await answerCreate('YourPreference yourPrefrence = YourPreference.getInstance(context); yourPreference.saveData(YOUR_KEY,YOUR_VALUE);', u2.username, new Date('2023-11-12T03:30:00'));
    let a5 = await answerCreate('I just found all the above examples just too confusing, so I wrote my own. ', u3.username, new Date('2023-11-01T15:24:19'));
    let a6 = await answerCreate('Storing content as BLOBs in databases.', u4.username, new Date('2023-02-19T18:20:59'));
    let a7 = await answerCreate('Using GridFS to chunk and store content.', u5.username, new Date('2023-02-22T17:19:00'));
    let a8 = await answerCreate('Store data in a SQLLite database.', u6.username, new Date('2023-03-22T21:17:53'));
    let a9 = await answerCreate('This is a sample answer', u7.username, new Date());

    await questionCreate('Programmatically navigate using React router', 'the alert shows the proper index for the li clicked, and when I alert the variable within the last function Im calling, moveToNextImage(stepClicked), the same value shows but the animation isnt happening. This works many other ways, but Im trying to pass the index value of the list item clicked to use for the math to calculate.', [t1, t2], [a1], u1.username, new Date('2022-01-20T03:00:00'), 10, [c1]);
    await questionCreate('android studio save string shared preference, start activity and load the saved string', 'I am using bottom navigation view but am using custom navigation, so my fragments are not recreated every time i switch to a different view. I just hide/show my fragments depending on the icon selected. The problem i am facing is that whenever a config change happens (dark/light theme), my app crashes. I have 2 fragments in this activity and the below code is what i am using to refrain them from being recreated.', [t3, t4, t2], [a1], u1.username, new Date('2023-01-10T11:24:30'), 121, [c2]);
    await questionCreate('Object storage for a web application', 'I am currently working on a website where, roughly 40 million documents and images should be served to its users. I need suggestions on which method is the most suitable for storing content with subject to these requirements.', [t5, t6], [a2], u2.username, new Date('2023-02-18T01:02:15'), 200, [c2]);
    await questionCreate('Quick question about storage on android', 'I would like to know the best way to go about storing an array on an android phone so that even when the app/activity ended the data remains', [t3, t4, t5], [a3], u3.username, new Date('2023-03-10T14:28:01'), 103);
    await questionCreate('React: How to handle state in functional components?', 'I am working on a React project using functional components. What is the best practice for managing state in functional components? Should I use the useState hook, or are there alternative approaches?', [t1, t2, t3, t4], [a4, a5, a9], u4.username, new Date('2023-02-18T01:02:15'), 101, [c5, c4, c4, c6]);
    await questionCreate('Java: How to read a file line by line?', 'I need to read the contents of a file line by line in a Java application. What iss the most efficient way to achieve this? Any examples or libraries that can simplify the process?', [t3, t4], [a6, a7, a8, a5, a4, a3], u7.username, new Date('2023-01-10T11:24:30'), 121, [c7, c8]);


    if (db) db.close();
    console.log('done');
};

//init().catch((err) => {
//    console.log("ERROR: " + err);
//    if (db) db.close();
//});

console.log("processing ...");