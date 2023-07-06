import { FC, useEffect, useState } from 'react';
import { Pagination } from 'antd';
import {
  LIST_DEFAULT_PAGE,
  LIST_DEFAULT_PAGE_SIZE,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
} from '@/constants/index.tsx';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

type ListPaginationType = {
  total: number;
};

const ListPagination: FC<ListPaginationType> = (props: ListPaginationType) => {
  const { total } = props;
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(LIST_DEFAULT_PAGE_SIZE);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const page = +(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || LIST_DEFAULT_PAGE;
    setCurrent(page);
    const pageSize = +(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_DEFAULT_PAGE_SIZE;
    setPageSize(pageSize);
  }, [searchParams]);

  function handlePageChange(page: number, pageSize: number) {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString());
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString());

    navigate({
      pathname,
      search: searchParams.toString(),
    });
  }

  return (
    <Pagination current={current} pageSize={pageSize} total={total} onChange={handlePageChange} />
  );
};

export default ListPagination;
