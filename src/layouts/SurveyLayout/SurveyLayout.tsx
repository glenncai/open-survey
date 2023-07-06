import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const SurveyLayout: FC = () => {
  return (
    <>
      <p>SurveyLayout Header</p>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default SurveyLayout;
