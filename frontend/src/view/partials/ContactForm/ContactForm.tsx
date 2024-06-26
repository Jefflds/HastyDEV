import { Formik, Field } from "formik";
import { ButtonPrimaryLongNoLink } from "../../components/Buttons/Buttons";
import { FormContainer } from "../../styles/ContactForm/ContactForm.styles";
import Loader from "../../components/Loader/Loader";
import { validationsContact } from "../../../data/services/Validation/ValidationContact.service";
import { useContactForm } from "./useContactForm";

const ContactForm = () => {
  const {loading, handleContact } = useContactForm();

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <FormContainer>
          <Formik
            initialValues={{
              Name: "",
              Email: "",
              Phone: "",
              Category: "",
              Subject: "",
              Message: "",
            }}
            onSubmit={handleContact}
            validationSchema={validationsContact}
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
                  <div className="form-input">
                    <Field type="text" placeholder="Nome" name="Name" />
                    <span>{errors.Name && touched.Name && errors.Name}</span>
                  </div>
                  <div className="form-input">
                    <Field type="email" placeholder="E-mail" name="Email" />
                    <span>{errors.Email && touched.Email && errors.Email}</span>
                  </div>
                  <div className="form-input">
                    <Field type="tel" placeholder="Telefone" name="Phone" />
                    <span>{errors.Phone && touched.Phone && errors.Phone}</span>
                  </div>
                  <div>
                    <select
                      title="Category"
                      id="Category"
                      name="Category"
                      value={values.Category}
                      onChange={(e) =>
                        setFieldValue("Category", e.target.value)
                      }
                    >
                      <option value="">Selecione uma Categoria</option>
                      <option value="Comercial">Comercial</option>
                      <option value="Financeiro">Financeiro</option>
                      <option value="Suporte">Suporte</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                  <div className="form-input">
                    <Field type="text" placeholder="Assunto" name="Subject" />
                    <span>
                      {errors.Subject && touched.Subject && errors.Subject}
                    </span>
                  </div>
                  <div className="form-input">
                    <Field
                      component="textarea"
                      name="Message"
                      placeholder="Digite sua Mensagem..."
                      required
                    />
                    <span>
                      {errors.Message && touched.Message && errors.Message}
                    </span>
                  </div>
                  <ButtonPrimaryLongNoLink
                    type="submit"
                    buttonText="Entre em Contato"
                    disabled={isSubmitting}
                  />
                </form>
              </>
            )}
          </Formik>
        </FormContainer>
      )}
    </>
  );
};

export default ContactForm;
