import React from 'react';
import { Button, Result } from 'antd';

const NotFound: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Desculpe, a página que você visitou não existe."
    extra={<Button type="primary">Voltar para a pagina inicial</Button>}
  />
);

export default NotFound;