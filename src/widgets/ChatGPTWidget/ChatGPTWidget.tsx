import React, {useCallback, useState} from 'react';
import {useAppSelector} from '@/app/store';
import {useSaveResponseToLocalStorage} from '@/app/services/localStorageController/hooks';
import {selectIsOnEdit} from '@/app/services/mainPageController/mainPageSlice';
import {useGetChatGPTMessageMutation} from '@/app/services/chatGPT/hooks';
import {Button, Card, List, Textarea} from '@/shared/UI';

import './ChatGPTWidget.scss';

type Props = {
  id: string;
  className: string;
};

export const ChatGPTWidget = ({id, className}: Props) => {
  const [txt, setTxt] = useState<string>('');
  const [response, setResponse] = useSaveResponseToLocalStorage();

  console.log(response);

  const isDraggable = useAppSelector(selectIsOnEdit);

  const [getChatGPTMessage, {data, isSuccess, isLoading, error}] = useGetChatGPTMessageMutation();

  console.log(data, error);

  const onSaveResponse = useCallback(() => {
    setResponse(
      // const content = data?.choices.map((item) => item.message.content);
      {
        title: 'How to become successful?',
        // content: content[0],
        content: `As an AI language model, I am not capable of having personal experiences and ambitions, but I can give some general tips on how to become successful:

        1. Have a clear vision and set goals
        2. Develop a strong work ethic and discipline
        3. Learn to prioritize and manage your time effectively
        4. Continuously educate yourself and be open to learning new things
        5. Surround yourself with positive, supportive people
        6. Take calculated risks and be willing to step out of your comfort zone
        7. Be resilient and learn from your mistakes
        8. Stay focused and persevere through challenges and setbacks
        9. Network and build relationships within your industry or field
        10. Maintain a positive attitude and always strive for self-improvement.`,
      },
    );
    // }
  }, [data]);

  return (
    <Card id={id} className={className} title="Chat GPT" isDraggable={isDraggable}>
      <div className="chat-gpt-widget__container">
        <div className="chat-gpt-widget__controls">
          <Textarea value={txt} onChange={setTxt} placeholder="Send a message..." />
          <Button onClick={() => getChatGPTMessage(txt)} disabled={!txt || isLoading}>
            Send
          </Button>
        </div>
        <div className="chat-gpt-widget__list-wrapper">
          <List>
            <p>{data?.choices.map((item) => item.message.content)}</p>
            {/* <p>
              {
                'Name: John Doe\nEmail: johndoe@email.com\nPhone: (123) 456-7890 \n\nObjective:\nTo obtain a Middle Frontend Developer position using my experience in web development and design, as well as my attention to detail and passion for creating user-friendly interfaces. \n\nSummary: \nI am an experienced front-end developer with a passion for creating clean, modern, and responsive websites. With over five years of experience in web design and development, I excel at translating client needs into successful web designs. I am highly skilled in JavaScript, HTML5, and CSS3, and have experience with Adobe Creative Suite, WordPress, and various other web development tools. I am a team player who values collaboration and communication, and enjoy working in a fast-paced, dynamic environment.\n\nEducation:\nBachelor of Science in Computer Science\nXYZ University, XYZ City\nGraduated: May 20XX\n\nSkills:\n- Proficient in HTML5, CSS3, JavaScript, and various JavaScript libraries\n- Experience with Adobe Creative Suite and other design tools\n- Experienced with WordPress and other CMS platforms\n- Ability to write efficient and readable code using various programming paradigms\n- Strong communication skills and able to work collaboratively\n- Familiarity with Agile development methodologies\n\nExperience:\n\nFrontend Developer\nABC Company, XYZ City\nSeptember 20XX – Present\n\nResponsibilities:\n- Collaborate with the design team to create user-friendly, responsive, and engaging interfaces\n- Develop front-end functionality using HTML5, CSS3, JavaScript, AngularJS, and React\n- Design and develop WordPress themes and plugins\n- Optimize website designs for SEO and performance\n- Stay up-to-date with the latest web development trends and best practices\n\nWeb Developer\nDEF Company, XYZ City\nJune 20XX – August 20XX\n\nResponsibilities:\n- Worked with a team of developers to design and develop interactive websites and mobile applications using HTML, CSS, and JavaScript\n- Wrote efficient and maintainable code following best practices and coding standards\n- Collaborated with the design team to ensure smooth implementation of web designs\n- Contributed to user testing and debugging efforts to ensure a seamless user experience\n\nCertifications:\n- Google Analytics Certification\n- HubSpot Inbound Certification \n\nLanguages: \nEnglish (Fluent), Spanish (Intermediate)\n\nReferences:\nAvailable upon request.'
              }
            </p> */}
          </List>
        </div>
        {/* {isSuccess && <Button onClick={onSaveResponse}>Save Response</Button>} */}
        <Button onClick={onSaveResponse}>Save Response</Button>
      </div>
    </Card>
  );
};
