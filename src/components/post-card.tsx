import { FiClock } from "react-icons/fi";
import { formatTime } from "src/utils/datetime";
import { type IPostOutline } from "src/utils/post";
import { Link } from "./common/link";
import { TopicTag } from "./topic-tag";

interface IProps {
  index?: number;
  outline: IPostOutline;
}

export const PostCard = ({
  index = 0,
  outline: { slug, createdAt, title, description, topic, readingTime },
}: IProps) => (
  <div
    className="w-full py-8 animate-leftslide"
    style={{
      animationDelay: `${index * 0.2}s`,
      animationFillMode: "backwards",
    }}
  >
    <div className="flex justify-between items-center gap-x-4 flex-wrap">
      <h3>
        <Link
          href={"/posts/" + slug}
          className="py-1 font-bold text-lg sm:text-xl hover:text-highlight"
        >
          {title}
        </Link>
      </h3>
      <p className="flex items-center gap-x-1 py-1 text-sm text-dim">
        <FiClock />
        {readingTime}
      </p>
    </div>
    <p className="my-3 text-sm sm:text-base text-dim line-clamp-2">
      {description}
    </p>
    <div className="flex justify-between items-center gap-x-4 gap-y-2 flex-wrap">
      <time
        dateTime={createdAt}
        className="font-semibold text-sm sm:text-base text-dim"
      >
        {formatTime(createdAt)}
      </time>
      <TopicTag topic={topic} />
    </div>
  </div>
);
