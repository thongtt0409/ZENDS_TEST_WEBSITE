import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Content = () => {
  const [loading, setLoading] = useState(true);
  const [listStory, setListStory] = useState({});
  const [next, setNext] = useState(0);

  useEffect(() => {
    const getAllStory = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get('http://localhost:8081/api/story/all');
        setListStory(response.data);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    getAllStory();
  }, []);

  const handleVoteStory = async (vote) => {
    try {
      axios.put(`http://localhost:8081/api/story/${vote}/${listStory[next]._id}`);
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
                <button className="btn blue" onClick={() => handleVoteStory('like')}>
                  This is Funny!
                </button>
                <button className="btn green" onClick={() => handleVoteStory('unlike')}>
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
