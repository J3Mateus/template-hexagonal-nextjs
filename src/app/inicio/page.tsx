"use client"

import React, { useEffect } from 'react';
import { Avatar, List } from 'antd';
import {
  useFetchPost,
  usePost,
} from '@web/contexts/mock/hook';

const Home: React.FC = () => {
  const data = useFetchPost();
  const posts = usePost();

  useEffect(() => {
    data();
  },[])

  return (
    <div className="App">
    <List
      itemLayout="horizontal"
      dataSource={posts}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
            title={item.title}
            description={item.body}
          />
        </List.Item>
      )}
    />
    </div>
  );
}

export default Home;
