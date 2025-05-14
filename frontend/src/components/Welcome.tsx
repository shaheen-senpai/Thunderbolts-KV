import React from "react";
import { WelcomeContainer, WelcomeTitle, WelcomeSubtitle, ExampleContainer, ExampleCard, ExampleTitle, ExampleText } from "../styles/styles";

interface WelcomeProps {
	onSelectExample: (text: string) => void;
}

const examplePrompts = [
	{
		title: "Explain quantum computing",
		text: "Explain quantum computing in simple terms",
	},
	{
		title: "Creative ideas",
		text: "Got any creative ideas for a 10 year old's birthday?",
	},
	{
		title: "Code explanation",
		text: "How do I make an HTTP request in Javascript?",
	},
	{
		title: "Learn something",
		text: "Explain the basic principles of machine learning",
	},
];

const Welcome: React.FC<WelcomeProps> = ({ onSelectExample }) => {
	return (
		<WelcomeContainer>
			<WelcomeTitle>KV-GPT</WelcomeTitle>
			<WelcomeSubtitle>
				A ChatGPT-like interface powered by Agentic AI. Ask a question or select an example below to get started.
			</WelcomeSubtitle>

			<ExampleContainer>
				{examplePrompts.map((example, index) => (
					<ExampleCard key={index} onClick={() => onSelectExample(example.text)}>
						<ExampleTitle>{example.title}</ExampleTitle>
						<ExampleText>{example.text}</ExampleText>
					</ExampleCard>
				))}
			</ExampleContainer>
		</WelcomeContainer>
	);
};

export default Welcome;
