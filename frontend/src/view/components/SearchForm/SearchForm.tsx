import { Formik } from "formik";
import { ButtonPrimaryLongNoLink } from "../Buttons/Buttons";
import {
  SearchFormDiv,
  SearchFormHeadingInterTitle,
} from "../../styles/SearchForm/SearchForm.styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../Loader/Loader";
import { validationsSearch } from "../../../data/services/Validation/ValidationSearch.service";

const SearchForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleOnClick = () => {
    try {
      setLoading(true);
      navigate("/register");
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    handleOnClick();
  };
  return (
    <>
      {loading && <Loader />}
      <SearchFormDiv>
        <SearchFormHeadingInterTitle
          intertitle="Procure um Projeto Ideal"
          className="text-center"
        />
        <Formik
          initialValues={{
            Partner: "",
            WorkArea: "",
            wantMoney: "",
          }}
          onSubmit={handleSearch}
          validationSchema={validationsSearch}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <>
              <form onSubmit={handleSubmit}>
                <div className="form-group mt-3">
                  <label htmlFor="Partner">Qual Parceiro Deseja Ajudar?</label>
                  <select
                    title="Partner"
                    id="Partner"
                    name="Partner"
                    value={values.Partner}
                    onChange={(e) => setFieldValue("Partner", e.target.value)}
                  >
                    <option value="" disabled>
                      Selecione uma Categoria
                    </option>
                    <option value="ONGs">ONGs</option>
                    <option value="MEIs">MEIs</option>
                  </select>
                  {errors.Partner && touched.Partner && errors.Partner}
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="WorkArea">Qual Sua Área de Atuação?</label>
                  <select
                    title="WorkArea"
                    id="WorkArea"
                    name="WorkArea"
                    value={values.WorkArea}
                    onChange={(e) => setFieldValue("WorkArea", e.target.value)}
                  >
                    <option value="" disabled>
                      Selecione uma Categoria
                    </option>
                    <option value="Front-End">Front-End</option>
                    <option value="Back-End">Back-End</option>
                    <option value="Devops">Devops</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Web Design">Web Design</option>
                    <option value="Desktop">Desktop</option>
                  </select>
                  {errors.WorkArea && touched.WorkArea && errors.WorkArea}
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="wantMoney">Deseja Remuneração?</label>
                  <select
                    title="wantMoney"
                    id="wantMoney"
                    name="wantMoney"
                    value={values.wantMoney}
                    onChange={(e) => setFieldValue("wantMoney", e.target.value)}
                  >
                    <option value="" disabled>
                      Selecione uma Categoria
                    </option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                  </select>
                  {errors.wantMoney && touched.wantMoney && errors.wantMoney}
                </div>
                <ButtonPrimaryLongNoLink
                  type="submit"
                  buttonText="Procure o Projeto"
                  disabled={isSubmitting}
                  className="mt-4"
                  onClick={handleOnClick}
                />
              </form>
            </>
          )}
        </Formik>
      </SearchFormDiv>
    </>
  );
};

export default SearchForm;
