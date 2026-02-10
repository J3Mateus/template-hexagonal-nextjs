'use client'

import React from 'react';
import { Button, Result } from 'antd';

const GlobalError: React.FC = () => (
  <html>
    <body>
      <Result
        status="500"
        title="500"
        subTitle="Desculpe, algo deu errado."
        extra={<Button type="primary">Back Home</Button>}
      />
    </body>
  </html>
);

export default GlobalError;