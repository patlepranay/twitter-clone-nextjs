import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";
import Community from './../../lib/models/community.model';

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}
const ThreadsTab = async ({ currentUserId, accountId, accountType }: Props) => {
  let result: any;
  if (accountType === "Community") {
    result = await fetchCommunityPosts(accountId);
  } else {
    result = await fetchUserPosts(accountId);
  }

  if (!result) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads.map((thread: any) => {
        return (
          <ThreadCard
            id={thread._id}
            currentUserId={currentUserId || ""}
            parentID={thread.parentId}
            content={thread.text}
            author={
              accountType === "User"
                ? { name: result.name, image: result.image, id: result.id }
                : { name: thread.author.name, image: thread.author.image }
            }
            community={thread.community}
            createdAt={thread.createdAt}
            comments={thread.children}
          />
        );
      })}
    </section>
  );
};

export default ThreadsTab;
