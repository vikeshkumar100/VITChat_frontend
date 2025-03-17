import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
const FAQ = [
  {
    question: "Can faculty or outsiders join VITChat?",
    answer:
      "No, only students with a VIT email ID can log in, keeping the community student-focused.",
  },
  {
    question: "Is VITChat officially developed by VIT?",
    answer:
      "No, VITChat is a student-led project developed by VIT students for VIT students.",
  },
  {
    question: "Who can use VITChat?",
    answer:
      "Only students with a valid VIT email ID can access VITChat, ensuring a secure and student-only environment.",
  },
  {
    question: "Is my data safe on VITChat?",
    answer:
      "Yes! VITChat prioritizes privacy. We don’t store chat messages, and only verified VITians can access the platform.",
  },
  {
    question: "Are my messages stored permanently?",
    answer:
      "No, VITChat does not store messages. Conversations disappear after you leave the chat.",
  },
  {
    question: "What kind of chats are available on VITChat?",
    answer:
      "VITChat offers:\n- **Global Chat**: Public chatrooms for general discussions.\n- **Random Chat**: Connect with random VITians for networking.\n- **Chatbot**: Get quick answers about VIT rules, events, and academics.",
  },
  {
    question: "How can I suggest a new feature?",
    answer: "You can share your ideas via the 'Review Us' section in VITChat!",
  },
];

const AccordianFAQ = () => {
  return (
    <div className="relative flex flex-col justify-center items-center w-full p-6 rounded-xl pb-32 gap-6">
      <h2 className="text-3xl md:text-5xl font-bold text-center">
        Frequently asked questions
      </h2>
      <p className="text-gray-500 text-center mb-6">
        Everything you need to know
      </p>

      <div className="md:w-2/3 flex flex-col gap-2">
        {FAQ.map((faq, index) => {
          return (
            <Accordion
              type="single"
              collapsible
              className="w-full bg-gray-500/30 px-4 rounded-lg"
              key={index}
            >
              <AccordionItem value={String(index)} className="rounded-md">
                <AccordionTrigger className="font-semibold text-xl" key={index}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-lg">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>
      <div className="absolute z-[-100] top-0 left-0 md:w-72 w-0 md:h-72 h-0 bg-blue-500 rounded-full opacity-40 blur-[120px] dark:opacity-20"></div>
      <div className="absolute z-[-100] bottom-0 right-0 md:w-72 w-0 md:h-72 h-0 bg-blue-500 rounded-full opacity-40 blur-[120px] dark:opacity-20"></div>
    </div>
  );
};

export default AccordianFAQ;
