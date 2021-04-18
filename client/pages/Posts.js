import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Posts = (props) => {
  const [list, setList] = useState(props.data);

  // useEffect(() => {
  //   (async () => {
  //     const response = await axios.get(
  //       'http://jsonplaceholder.typicode.com/posts'
  //     );
  //     setList(response.data);
  //   })();
  // }, []);

  return (
    <PostsListBox>
      {list.map((item, index) => {
        const key = `postsListItem${index}`;
        return (
          <div className="post-list-item" key={key}>
            {item.title}
            <span>Hello</span>
            <img src={'/images/image.jpg'} />
          </div>
        );
      })}
    </PostsListBox>
  );
};

const PostsListBox = styled.div(() => {
  return `
    .post-list-item {
      background-color: #555;
      color: #fff;
      margin-bottom: 15px;
      padding: 7px;
      font-size: 18px;
    }
  `;
});

Posts.getInitialProps = async () => {
  const response = await axios.get('http://jsonplaceholder.typicode.com/posts');

  return {
    data: response.data,
  };
};

export default Posts;