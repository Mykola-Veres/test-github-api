import {SearchStyled, FormStyled, ButtonStyled} from "./SearchFormUser.styled";

export default function SearchFormUser ({searchParam}) {

  const handlerSubmitUser = (event) => {
    event.preventDefault();
    const userQuery = event.currentTarget.elements.query.value;
    searchParam({query: userQuery});
    event.currentTarget.reset();
  }

  return(
    <FormStyled onSubmit={handlerSubmitUser}>
      <SearchStyled
          name="query"
          required
          id="film-name"
          aria-label="search"
          minLength="1"
          autoComplete="off"
          autoFocus
          placeholder="Search user"
      />
      <ButtonStyled  type="submit">
        <span>search</span>
      </ButtonStyled>
    </FormStyled>
    )
}
