import { PostFormFooter } from "@/components/molecules/PostFormFooter";
import { PostFormHeroImage } from "@/components/molecules/PostFormHeroImage";
import { PostFormInfo } from "@/components/molecules/PostFormInfo";
import { TextareaWithInfo } from "@/components/molecules/TextareaWithInfo";
import { updateMyPostInputSchema } from "@/lib/schema/MyPost";
import { PutInput } from "@/pages/api/my/posts/[postId]";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import styles from "./styles.module.css";

type Props<T extends FieldValues = PutInput> = {
  title: string;
  defaultValues?: Partial<T>;
  children?: React.ReactNode;
  onValid: SubmitHandler<T>;
  onInvalid?: SubmitErrorHandler<T>;
  onClickSave: (isPublish: boolean) => void;
  onClickDelete?: () => void;
};

export const PostForm = (props: Props) => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PutInput>({
    defaultValues: props.defaultValues,
    resolver: zodResolver(updateMyPostInputSchema),
  });
  return (
    <form
      aria-label={props.title}
      className={styles.module}
      onSubmit={handleSubmit(props.onValid, props.onInvalid)} // 有効時にはonValid関数、無効時にはonInvalid関数をコールバックする
    >
      <div className={styles.content}>
        <div className={styles.meta}>
          <PostFormInfo register={register} control={control} errors={errors} />
          <PostFormHeroImage
            register={register}
            setValue={setValue}
            name="imageUrl"
            defaultImageUrl={props.defaultValues?.imageUrl}
            error={errors.imageUrl?.message}
          />
        </div>
        <TextareaWithInfo
          {...register("body")}
          title="本文"
          rows={20}
          error={errors.body?.message}
        />
      </div>
      <PostFormFooter
        isSubmitting={isSubmitting}
        register={register}
        control={control}
        onClickSave={props.onClickSave}
        onClickDelete={props.onClickDelete}
      />
      {props.children}
    </form>
  );
};
