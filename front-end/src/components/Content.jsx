import React, { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const Content = () => {
  const [loading, setLoading] = useState(true);
  const [listStory, setListStory] = useState({});
  const [next, setNext] = useState(0);
  const [disabled, setDisabled] = useState(false);

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
      const response = await axios.put(`http://localhost:8081/api/story/${vote}/${listStory[next]._id}`, {
        mode: 'cors',
        withCredentials: true,
      });
      if (response.data.status == 400) {
        setDisabled(true);
        return;
      }
      setNext(next + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <div className="container">
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
      </div>
    </section>
  );
};

export default Content;
