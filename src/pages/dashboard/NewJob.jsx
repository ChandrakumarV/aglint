import { useForm } from "react-hook-form";
import ErrorMessage from "../../ui/ErrorMessage";
import styles from "./NewJob.module.css";

function NewJob() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  async function newjobHandler(data) {
    console.log(data);
  }

  return (
    <div className={styles.newJobContainer}>
      <form onSubmit={handleSubmit(newjobHandler)}>
        <h1>Add a new Job</h1>
        <div className={styles.inputcontainer}>
          <input
            type="text"
            id="job_name"
            placeholder="enter a Job name"
            {...register("job_name", {
              required: "This field is required",
            })}
          />
          {errors?.job_name?.message && (
            <ErrorMessage>{errors?.job_name?.message}</ErrorMessage>
          )}
        </div>

        <div className={styles.inputcontainer}>
          <input
            type="number"
            id="no_employee"
            placeholder="enter a empolyee needs"
            {...register("no_employee", {
              required: "This field is required",
              min: {
                value: 1,
                message: "at least one employee",
              },
            })}
          />
          {errors?.no_employee?.message && (
            <ErrorMessage>{errors?.no_employee?.message}</ErrorMessage>
          )}
        </div>

        <div className={styles.inputcontainer}>
          <input
            id="location"
            type="text"
            placeholder="enter a location of work"
            {...register("location", {
              required: "This field is required",
            })}
          />
          {errors?.location?.message && (
            <ErrorMessage>{errors?.location?.message}</ErrorMessage>
          )}
        </div>

        <div className={styles.inputcontainer}>
          <input
            id="type"
            type="text"
            placeholder="enter a type on-site or remote"
            {...register("type", {
              required: "This field is required",
            })}
          />
          {errors?.type?.message && (
            <ErrorMessage>{errors?.type?.message}</ErrorMessage>
          )}
        </div>

        <div className={styles.inputcontainer}>
          <div className={styles.radioContainers}>
            <h4>Status</h4>
            <div className={styles.radioContainer}>
              <input
                id="published"
                type="radio"
                value="published"
                placeholder="enter a type on-site or remote"
                {...register("status", {
                  required: "This field is required",
                })}
              />
              <label htmlFor="published">Publised</label>
            </div>

            <div className={styles.radioContainer}>
              <input
                id="draft"
                type="radio"
                value="draft"

                placeholder="enter a type on-site or remote"
                {...register("status", {
                  required: "This field is required",
                })}
              />
              <label htmlFor="draft">Draft</label>
            </div>
            </div>
            {errors?.status?.message && (
              <ErrorMessage>{errors?.status?.message}</ErrorMessage>
            )}
        </div>
        <button type="submit"> Add a job</button>
      </form>
    </div>
  );
}

export default NewJob;
