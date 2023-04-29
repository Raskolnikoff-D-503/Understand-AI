import React, {useState} from 'react';
import {useGetChatGPTMessageMutation} from '@/app/services/chatGPT/hooks';
import {Button, Card, List, Textarea} from '@/shared/UI';

import './ChatGPTWidget.scss';

type Props = {
  id: string;
  className: string;
};

export const ChatGPTWidget = ({id, className}: Props) => {
  const [txt, setTxt] = useState<string>('');

  const [getChatGPTMessage, response] = useGetChatGPTMessageMutation();

  console.log(getChatGPTMessage, response);

  return (
    <Card id={id} className={`chat-gpt-widget ${className}`} title="Chat GPT" isDraggable>
      <div className="chat-gpt-widget__container">
        <div className="chat-gpt-widget__controls">
          <Textarea value={txt} onChange={setTxt} placeholder="Send a message..." />
          <Button onClick={() => getChatGPTMessage(txt)} disabled={!txt || response.isLoading}>
            Send
          </Button>
        </div>
        <div className="chat-gpt-widget__list-wrapper">
          <List>
            {/* <div>{response?.data?.choices.map((item) => item.message.content)}</div> */}
            <p>
              {
                'Name: John Doe\nEmail: johndoe@email.com\nPhone: (123) 456-7890 \n\nObjective:\nTo obtain a Middle Frontend Developer position using my experience in web development and design, as well as my attention to detail and passion for creating user-friendly interfaces. \n\nSummary: \nI am an experienced front-end developer with a passion for creating clean, modern, and responsive websites. With over five years of experience in web design and development, I excel at translating client needs into successful web designs. I am highly skilled in JavaScript, HTML5, and CSS3, and have experience with Adobe Creative Suite, WordPress, and various other web development tools. I am a team player who values collaboration and communication, and enjoy working in a fast-paced, dynamic environment.\n\nEducation:\nBachelor of Science in Computer Science\nXYZ University, XYZ City\nGraduated: May 20XX\n\nSkills:\n- Proficient in HTML5, CSS3, JavaScript, and various JavaScript libraries\n- Experience with Adobe Creative Suite and other design tools\n- Experienced with WordPress and other CMS platforms\n- Ability to write efficient and readable code using various programming paradigms\n- Strong communication skills and able to work collaboratively\n- Familiarity with Agile development methodologies\n\nExperience:\n\nFrontend Developer\nABC Company, XYZ City\nSeptember 20XX – Present\n\nResponsibilities:\n- Collaborate with the design team to create user-friendly, responsive, and engaging interfaces\n- Develop front-end functionality using HTML5, CSS3, JavaScript, AngularJS, and React\n- Design and develop WordPress themes and plugins\n- Optimize website designs for SEO and performance\n- Stay up-to-date with the latest web development trends and best practices\n\nWeb Developer\nDEF Company, XYZ City\nJune 20XX – August 20XX\n\nResponsibilities:\n- Worked with a team of developers to design and develop interactive websites and mobile applications using HTML, CSS, and JavaScript\n- Wrote efficient and maintainable code following best practices and coding standards\n- Collaborated with the design team to ensure smooth implementation of web designs\n- Contributed to user testing and debugging efforts to ensure a seamless user experience\n\nCertifications:\n- Google Analytics Certification\n- HubSpot Inbound Certification \n\nLanguages: \nEnglish (Fluent), Spanish (Intermediate)\n\nReferences:\nAvailable upon request.'
              }
            </p>
          </List>
        </div>
      </div>
    </Card>
  );
};
