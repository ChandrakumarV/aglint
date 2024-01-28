import { useForm } from "react-hook-form";
import ErrorMessage from "../../ui/ErrorMessage";
import styles from "./NewJob.module.css";
import { addNewjob } from "../../services/jopApi";
import { useState } from "react";
import {useSelector} from 'react-redux'
import { fetchJobs } from "../../slices/job";
import {useDispatch } from 'react-redux'
import {toast} from 'react-hot-toast'

function NewJob() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const {user:{id:user_id}} = useSelector(state => state.user)
  const [isLoad,setIsLoad] = useState(false)
  const dispatch = useDispatch()



  async function newjobHandler(data) {
    setIsLoad(true)
    try{
      await addNewjob({...data,user_id})
      dispatch(fetchJobs(user_id))
      toast.success("Job successfully Added")
    }
    catch(error){
      toast.error("Some thing went wrong")
    }
    finally{
      setIsLoad(false)
    }
  }

  return (
    <div className={styles.newJobContainer}>
      <form onSubmit={handleSubmit(newjobHandler)}>
        <h1>Add a new Job</h1>
        <div className={styles.inputcontainer}>
          <input
            type="text"
            id="job_name"
            placeholder="Enter a Job name"
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
            id="no_emp"
            placeholder="Enter a empolyee needs"
            {...register("no_emp", {
              required: "This field is required",
              min: {
                value: 1,
                message: "at least one employee",
              },
            })}
          />
          {errors?.no_emp?.message && (
            <ErrorMessage>{errors?.no_emp?.message}</ErrorMessage>
          )}
        </div>

        <div className={styles.inputcontainer}>
          <input
            id="location"
            type="text"
            placeholder="Enter a location of work"
            {...register("location", {
              required: "This field is required",
            })}
          />
          {errors?.location?.message && (
            <ErrorMessage>{errors?.location?.message}</ErrorMessage>
          )}
        </div>

        <div className={styles.inputcontainer}>
          <div className={styles.radioContainers}>
            <h4>Type</h4>
            <div className={styles.radioContainer}>
              <input
                id="on-site"
                type="radio"
                value="on-site"
                {...register("type", {
                  required: "This field is required",
                })}
              />
              <label htmlFor="on-site">On-site</label>
            </div>

            <div className={styles.radioContainer}>
              <input
                id="remote"
                type="radio"
                value="remote"

                {...register("type", {
                  required: "This field is required",
                })}
              />
              <label htmlFor="remote">Remote</label>
            </div>
            </div>
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
        <button type="submit" disabled={isLoad}> {isLoad?"Loading":"Add a job"}</button>
      </form>
    </div>
  );
}

export default NewJob;
