import React, { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const Content = () => {
  const [loading, setLoading] = useState(true);
  const [listStory, setListStory] = useState({});
  const [next, setNext] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const dataTest = [
    {
      content:
        'A child asked his father, "How were people born?" So his father said, "Adam and Eve made babies, then their babies became adults and made babies, and so on." The child then went to his mother, asked her the same question and she told him, "We were monkeys then we evolved to become like we are now." The child ran back to his father and said, "You lied to me!" His father replied, "No, your mom was talking about her side of the family."',
    },
    {
      content:
        'Teacher: "Kids,what does the chicken give you?" Student: "Meat!" Teacher: "Very good! Now what does the pig give you?" Student: "Bacon!" Teacher: "Great! And what does the fat cow give you?" Student: "Homework!"',
    },
    {
      content:
        'The teacher asked Jimmy, "Why is your cat at school today Jimmy?" Jimmy replied crying, "Because I heard my daddy tell my mommy, \'I am going to eat that pussy once Jimmy leaves for school today!\'"',
    },
    {
      content:
        'A housewife, an accountant and a lawyer were asked "How much is 2+2?" The housewife replies: "Four!". The accountant says: "I think it\'s either 3 or 4. Let me run those figures through my spreadsheet one more time." The lawyer pulls the drapes, dims the lights and asks in a hushed voice, "How much do you want it to be?"',
    },
  ];

  useEffect(() => {
    const getAllStory = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get('https://zens-test.onrender.com/api/story/all', {
          withCredentials: true,
        });
        setListStory(response.data);
        if (next > listStory.length) setDisabled(true);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    getAllStory();
  }, []);

  const handleVoteStory = async (vote) => {
    try {
      const response = await axios.put(
        `https://zens-test.onrender.com/api/story/${vote}/${listStory[next]._id}`,
        {
          mode: 'cors',
          withCredentials: true,
        }
      );
      if (response.data.status == 400) {
        setDisabled(true);
        return;
      }
      setNext(next + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickDataTest = () => {
    setNext(next + 1);
  };

  return (
    <section>
      {/* <div className="container">
        <div className="content">
          <div className="item-1">
            <p>
              {loading && 'Loading...'}
              {next < listStory.length
                ? listStory[next].content
                : " That's all the jokes for today! Come back another day! "}
            </p>
          </div>
          <hr />
          <div className="item-2">
            {next < listStory.length && (
              <>
                <button
                  className={disabled ? 'disabled blue' : 'btn blue'}
                  disabled={disabled}
                  onClick={() => handleVoteStory('like')}
                >
                  This is Funny!
                </button>
                <button
                  className={disabled ? 'disabled green' : 'btn green'}
                  disabled={disabled}
                  onClick={() => handleVoteStory('unlike')}
                >
                  This is not funny.
                </button>
              </>
            )}
          </div>
        </div>
      </div> */}
      <div className="container">
        <div className="content">
          <div className="item-1">
            <p>
              {next < dataTest.length
                ? dataTest[next].content
                : " That's all the jokes for today! Come back another day! "}
            </p>
          </div>
          <hr />
          <div className="item-2">
            {next < dataTest.length && (
              <>
                <button className="btn blue" onClick={handleClickDataTest}>
                  This is Funny!
                </button>
                <button className="btn green" onClick={handleClickDataTest}>
                  This is not funny.
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
