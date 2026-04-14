import SecondaryButton from "../../components/Buttons/SecondaryButton";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
} from "../../components/ui/drawer";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { ThumbsUp, Wrench, BarChart3, MessageSquareText } from "lucide-react";
import { getStoredUser, isSessionValid, logoutIfAuthError } from "@/lib/auth";

// superb memes
import happycat from "../../assets/images/happycat.jpeg";
import happycat2 from "../../assets/images/happycat2.png";
import happycat3 from "../../assets/images/happycat3.jpg";
import happycat4 from "../../assets/images/happycat4.jpeg";
import happykid from "../../assets/images/happykid.jpeg";
import happyman from "../../assets/images/happyman.jpg";

// worst memes
import chalaja from "../../assets/images/chalaja.jpg";
import angryguy from "../../assets/images/angryguy.jpg";
import cryingdog from "../../assets/images/cryingdog.jpg";
import cryingdog2 from "../../assets/images/cryingdog2.jpeg";
import sadcat from "../../assets/images/sadcat.jpeg";
import sadcat2 from "../../assets/images/sadcat2.jpeg";

const superb = [happycat, happycat2, happycat3, happycat4, happykid, happyman];
const worst = [angryguy, cryingdog, cryingdog2, sadcat, sadcat2, chalaja];

const emptyStats = {
  superbCount: 0,
  needsFixesCount: 0,
  totalCount: 0,
  recentComments: [],
};

const Review = () => {
  const [reviewType, setReviewType] = useState("superb");
  const [randomIndex, setRandomIndex] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isStatsLoading, setIsStatsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stats, setStats] = useState(emptyStats);
  const [pageError, setPageError] = useState("");
  const [drawerError, setDrawerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [reviewComment, setReviewComment] = useState("");

  const apiurl = import.meta.env.VITE_API_URL;
  const storedUser = getStoredUser() || {};
  const isAuthenticated = isSessionValid();

  const reviewOptions = useMemo(
    () => ({
      superb: {
        title: "Thanks for the positive feedback!",
        subtitle: "Your support keeps us building better features.",
        cta: "Share More Feedback",
        image: superb[randomIndex],
      },
      "needs-fixes": {
        title: "Thanks for helping us improve",
        subtitle: "We value honest feedback and prioritize fixes.",
        cta: "Suggest Improvements",
        image: worst[randomIndex],
      },
    }),
    [randomIndex]
  );

  const fetchStats = async () => {
    try {
      setIsStatsLoading(true);
      const res = await axios.get(`${apiurl}/reviews/stats`, {
        headers: {
          Authorization: `Bearer ${storedUser.token}`,
        },
      });
      setStats(res.data?.stats || emptyStats);
      setPageError("");
    } catch (error) {
      if (logoutIfAuthError(error)) return;
      setPageError("Unable to load review stats right now.");
    } finally {
      setIsStatsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleDrawerOpen = (type) => {
    if (!isAuthenticated) {
      setPageError("Please login to submit a review.");
      return;
    }

    setReviewType(type);
    setReviewComment("");
    setDrawerError("");
    setSuccessMessage("");
    setRandomIndex(
      Math.floor(Math.random() * (type === "superb" ? superb.length : worst.length))
    );
    setIsDrawerOpen(true);
  };

  const handleDrawerChange = (open) => {
    setIsDrawerOpen(open);
    if (!open) {
      setDrawerError("");
      setIsSubmitting(false);
    }
  };

  const handleConfirmReview = async () => {
    if (isSubmitting) return;

    if (reviewType === "needs-fixes" && reviewComment.trim().length < 3) {
      setDrawerError("Please add a short comment (at least 3 characters) for Need Fixes.");
      return;
    }

    try {
      setIsSubmitting(true);
      setDrawerError("");
      const res = await axios.post(
        `${apiurl}/reviews/submit`,
        { type: reviewType, comment: reviewComment },
        {
          headers: {
            Authorization: `Bearer ${storedUser.token}`,
          },
        }
      );

      setStats(res.data?.stats || emptyStats);
      setIsDrawerOpen(false);
      setReviewComment("");
      setPageError("");
      setSuccessMessage(
        reviewType === "superb"
          ? "Thanks! Your positive review was saved."
          : "Thanks! Your improvement feedback was saved."
      );
    } catch (error) {
      if (logoutIfAuthError(error)) return;
      setDrawerError(error?.response?.data?.message || "Could not save your review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen md:h-screen box-border overflow-y-auto md:overflow-hidden pt-20 md:pt-24 px-4 md:px-6 pb-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto w-full max-w-6xl min-h-[calc(100vh-6.5rem)] md:h-full rounded-3xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/50 shadow-xl p-4 md:p-6 grid grid-rows-[auto_auto_auto_minmax(0,1fr)_auto] gap-4 overflow-hidden">
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Review VITChat
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mt-2">
            Quick reactions help us improve faster. Need Fixes can include a comment.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 p-3 shadow-sm">
            <div className="flex items-center justify-center gap-2 text-slate-700 dark:text-slate-200 text-sm">
              <BarChart3 className="w-4 h-4" />
              <span>Total</span>
            </div>
            <p className="text-2xl font-bold mt-1 text-blue-600 dark:text-blue-400">{stats.totalCount}</p>
          </div>
          <div className="rounded-xl border border-green-200 dark:border-green-900/70 bg-white/80 dark:bg-slate-900/60 p-3 shadow-sm">
            <div className="flex items-center justify-center gap-2 text-slate-700 dark:text-slate-200 text-sm">
              <ThumbsUp className="w-4 h-4" />
              <span>Superb</span>
            </div>
            <p className="text-2xl font-bold mt-1 text-green-600 dark:text-green-400">{stats.superbCount}</p>
          </div>
          <div className="rounded-xl border border-red-200 dark:border-red-900/70 bg-white/80 dark:bg-slate-900/60 p-3 shadow-sm">
            <div className="flex items-center justify-center gap-2 text-slate-700 dark:text-slate-200 text-sm">
              <Wrench className="w-4 h-4" />
              <span>Need Fixes</span>
            </div>
            <p className="text-2xl font-bold mt-1 text-red-600 dark:text-red-400">{stats.needsFixesCount}</p>
          </div>
        </div>

        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3">
          <SecondaryButton
            onClick={() => handleDrawerOpen("superb")}
            text="Superb 😻"
            disabled={!isAuthenticated}
            className="w-full sm:w-64 h-12 whitespace-nowrap font-semibold border-green-300 text-green-800 hover:bg-green-200 hover:text-green-900 dark:border-green-700 dark:text-green-300 dark:bg-green-900/20 dark:hover:bg-green-900/40 dark:hover:text-green-100"
          />
          <SecondaryButton
            onClick={() => handleDrawerOpen("needs-fixes")}
            text="Need Fixes 😿"
            disabled={!isAuthenticated}
            className="w-full sm:w-64 h-12 whitespace-nowrap font-semibold border-red-300 text-red-800 hover:bg-red-200 hover:text-red-900 dark:border-red-700 dark:text-red-300 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:hover:text-red-100"
          />
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/55 p-4 overflow-hidden h-full min-h-0">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base md:text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <MessageSquareText className="w-4 h-4" />
              Recent Improvement Suggestions
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">{stats.recentComments?.length || 0} shown</span>
          </div>

          <div className="h-[26vh] sm:h-[30vh] md:h-full md:max-h-[36vh] overflow-y-auto overscroll-contain pr-1 pb-3 space-y-3">
            {stats.recentComments?.length > 0 ? (
              stats.recentComments.map((item) => (
                <div
                  key={`${item._id || item.createdAt}-${item.userName}`}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3"
                >
                  <p className="text-sm text-slate-700 dark:text-slate-200">{item.comment}</p>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    {item.userName || "Anonymous"}
                  </p>
                </div>
              ))
            ) : (
              <div className="h-full min-h-24 flex items-center justify-center rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400">
                No comments yet. Use Need Fixes to add one.
              </div>
            )}
          </div>
        </div>

        <div className="text-center min-h-[1.25rem]">
          {isStatsLoading && (
            <p className="text-sm text-slate-500 dark:text-slate-400">Loading review stats...</p>
          )}
          {pageError && <p className="text-sm text-red-500 dark:text-red-400">{pageError}</p>}
          {successMessage && <p className="text-sm text-green-600 dark:text-green-400">{successMessage}</p>}
          {!isAuthenticated && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Please <Link to="/login" className="text-blue-600 dark:text-blue-400 underline">login</Link> to submit a review.
            </p>
          )}
        </div>
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={handleDrawerChange}>
        <DrawerContent className="max-h-[calc(100vh-5rem)] rounded-t-2xl border-slate-200 dark:border-slate-700 overflow-hidden p-0">
          <div className="w-full overflow-y-auto px-6 pt-6 pb-5 flex flex-col items-center gap-4">
            <span
              className={`text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full ${
                reviewType === "superb"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
              }`}
            >
              {reviewType === "superb" ? "Superb" : "Needs Fixes"}
            </span>

            <DrawerTitle className="text-xl font-bold text-center">
              {reviewOptions[reviewType].title}
            </DrawerTitle>

            <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-md">
              {reviewOptions[reviewType].subtitle}
            </p>

            {reviewType === "needs-fixes" ? (
              <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <img
                  src={reviewOptions[reviewType].image}
                  alt="improvement meme"
                  className="rounded-xl w-full max-w-[320px] md:max-w-[360px] aspect-square object-cover border border-slate-200 dark:border-slate-700 mx-auto"
                />

                <div className="w-full text-left rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 p-4">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    What should we improve?
                  </label>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Tell us what felt confusing, broken, or missing..."
                    rows={7}
                    maxLength={500}
                    className="mt-2 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 text-right">
                    {reviewComment.length}/500
                  </p>
                </div>
              </div>
            ) : (
              <img
                src={reviewOptions[reviewType].image}
                alt="feedback meme"
                className="rounded-xl w-full max-w-[320px] aspect-square object-cover border border-slate-200 dark:border-slate-700"
              />
            )}

            {drawerError && (
              <p className="text-sm text-red-500 dark:text-red-400 text-center w-full max-w-[360px]">
                {drawerError}
              </p>
            )}

            <div className="flex flex-col gap-3 w-full max-w-[360px] pt-1">
              <Button
                onClick={handleConfirmReview}
                disabled={isSubmitting}
                variant="default"
                size="sm"
                className={`w-full ${
                  reviewType === "superb"
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }`}
              >
                {isSubmitting ? "Saving..." : "Confirm Review"}
              </Button>

              <Button asChild variant="default" size="sm" className="w-full">
                <Link to="/contact" className="text-sm">
                  {reviewOptions[reviewType].cta}
                </Link>
              </Button>

              <DrawerClose asChild>
                <Button variant="outline" size="sm" className="w-full">
                  Cancel
                </Button>
              </DrawerClose>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Review;
