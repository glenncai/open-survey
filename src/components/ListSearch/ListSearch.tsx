import { FC, ChangeEvent, useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { LIST_SEARCH_PARAM_KEY } from '@/constants/index.tsx';
import { Input } from 'antd';

const { Search } = Input;

const ListSearch: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    const urlKeywordVal = searchParams.get(LIST_SEARCH_PARAM_KEY);
    if (urlKeywordVal) {
      setSearchValue(urlKeywordVal);
    }
  }, [searchParams]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setSearchValue(event.target.value);
  }

  function handleSearch(value: string) {
    navigate({
      pathname,
      search: `?${LIST_SEARCH_PARAM_KEY}=${value}`,
    });
  }

  return (
    <Search
      placeholder="Search..."
      size="large"
      value={searchValue}
      onChange={handleChange}
      onSearch={handleSearch}
      allowClear
    />
  );
};

export default ListSearch;
