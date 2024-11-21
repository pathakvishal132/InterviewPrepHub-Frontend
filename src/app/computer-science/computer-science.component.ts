import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { QuestionsService } from '../services/questions.service';
@Component({
  selector: 'app-computer-science',
  templateUrl: './computer-science.component.html',
  styleUrl: './computer-science.component.css'
})
export class ComputerScienceComponent {
  ds: any = {
    "result": {
      "q1": "Explain the bias-variance tradeoff in the context of machine learning models. How can it be addressed?",
      "q2": "Describe the difference between supervised, unsupervised, and reinforcement learning. Provide an example of a real-world application for each.",
      "q3": "What are some common techniques for handling missing data in a dataset? Discuss the advantages and disadvantages of each.",
      "q4": "Explain the concept of feature engineering. Give three examples of feature engineering techniques and when they might be useful.",
      "q5": "How would you approach a classification problem with highly imbalanced classes? Name at least three techniques.",
      "q6": "What are the key differences between precision and recall? When might you prioritize one over the other?",
      "q7": "Describe the process of building a recommendation system. What are some common algorithms used?",
      "q8": "Explain the concept of regularization in machine learning. What are the benefits of using L1 and L2 regularization?",
      "q9": "How would you evaluate the performance of a clustering algorithm? What metrics would you use?",
      "q10": "Discuss the ethical considerations involved in developing and deploying data science models. Provide at least two examples.",
      "q11": "What is overfitting in machine learning? How can it be prevented?",
      "q12": "Explain the differences between bagging and boosting. Provide examples of algorithms that use each technique.",
      "q13": "What is cross-validation, and why is it important in model evaluation?",
      "q14": "Describe the working of a decision tree algorithm. What are its advantages and limitations?",
      "q15": "What is the curse of dimensionality, and how can it affect machine learning models?",
      "q16": "Explain the concept of gradient descent. How does it optimize model parameters?",
      "q17": "What are the differences between parametric and non-parametric models in machine learning?",
      "q18": "Describe the K-Nearest Neighbors (KNN) algorithm. What are its main advantages and disadvantages?",
      "q19": "How does principal component analysis (PCA) help with dimensionality reduction?",
      "q20": "What is the difference between a generative model and a discriminative model? Provide examples of each.",
      "q21": "How would you explain the term 'ensemble learning' to a non-technical person?",
      "q22": "What is the difference between RMSE and MAE? When would you prefer one over the other?",
      "q23": "Describe the architecture and working of a convolutional neural network (CNN). What are CNNs best suited for?",
      "q24": "Explain the differences between batch gradient descent, stochastic gradient descent, and mini-batch gradient descent.",
      "q25": "What is a confusion matrix, and how is it used in evaluating classification models?",
      "q26": "Describe the concept of time series analysis. What are common challenges when working with time series data?",
      "q27": "What is transfer learning? Provide an example of how it can be applied.",
      "q28": "Explain the importance of scaling features in machine learning. What are common scaling techniques?",
      "q29": "What is a ROC curve? How is it useful in evaluating model performance?",
      "q30": "Explain the concept of clustering. What are the differences between hierarchical and k-means clustering?",
      "q31": "What are the trade-offs between using a deep neural network and a simpler machine learning algorithm?",
      "q32": "How do you handle categorical variables in machine learning models? Describe at least three techniques.",
      "q33": "What is an outlier in data, and how would you handle it in a dataset?",
      "q34": "Explain the concept of reinforcement learning. What are its primary components?",
      "q35": "What is a latent variable, and how is it used in machine learning models?",
      "q36": "Describe the difference between type I and type II errors in the context of hypothesis testing.",
      "q37": "What is a heatmap, and how can it be used for exploratory data analysis?",
      "q38": "Explain how decision boundaries are formed in classification algorithms like SVM or logistic regression.",
      "q39": "What are autoencoders, and how are they used in unsupervised learning tasks?",
      "q40": "How can you use SHAP or LIME for model interpretability in machine learning?"
    }
  }
  wb: any = {
    "result": {
      "q1": "What is the difference between HTML, CSS, and JavaScript in web development?",
      "q2": "Explain the concept of the DOM. How is it used in web development?",
      "q3": "What are some common HTTP methods, and how are they used?",
      "q4": "Describe the difference between inline, internal, and external CSS. When would you use each?",
      "q5": "What is the purpose of responsive design, and how can it be achieved?",
      "q6": "Explain the box model in CSS. What are its components?",
      "q7": "What is the difference between synchronous and asynchronous JavaScript? Provide examples.",
      "q8": "What are web APIs, and how are they used in web development?",
      "q9": "Describe the concept of RESTful architecture. What makes an API RESTful?",
      "q10": "What is the difference between session storage, local storage, and cookies in web development?",
      "q11": "Explain the purpose of media queries in CSS. Provide an example of how they are used.",
      "q12": "What are some common types of positioning in CSS, and how do they work?",
      "q13": "What is the difference between GET and POST requests in HTTP?",
      "q14": "Explain the concept of cross-origin resource sharing (CORS). Why is it important?",
      "q15": "What is the difference between client-side rendering (CSR) and server-side rendering (SSR)?",
      "q16": "How do you optimize a website for performance? Name at least three techniques.",
      "q17": "What is the difference between CSS Grid and Flexbox? When would you use each?",
      "q18": "Explain the purpose of version control in web development. What are some popular tools used for it?",
      "q19": "What is a Progressive Web App (PWA), and how does it enhance user experience?",
      "q20": "Describe the process of deploying a website. What tools or platforms can you use?",
      "q21": "What is the difference between authentication and authorization in web applications?",
      "q22": "Explain the concept of single-page applications (SPAs). What are their advantages and disadvantages?",
      "q23": "What is the difference between relational and non-relational databases? Provide examples.",
      "q24": "What is the purpose of a CSS preprocessor like Sass or LESS?",
      "q25": "Describe the purpose of WebSockets in modern web applications.",
      "q26": "What is the difference between a framework and a library in web development? Provide examples.",
      "q27": "What is the difference between a static website and a dynamic website?",
      "q28": "Explain the concept of MVC architecture. How is it used in web development?",
      "q29": "What is the purpose of the <meta> tag in HTML? Provide examples of its use.",
      "q30": "What are the benefits of using a content delivery network (CDN) in web development?",
      "q31": "Explain the purpose of semantic HTML. Why is it important?",
      "q32": "What are web components, and how do they differ from traditional HTML elements?",
      "q33": "Describe the importance of accessibility in web development. How can it be achieved?",
      "q34": "What is the purpose of lazy loading in web development, and how can it be implemented?",
      "q35": "What is the difference between inline-block and block elements in CSS?",
      "q36": "Explain the role of a build tool in web development. Provide examples of popular tools.",
      "q37": "What is a front-end framework? Name three popular frameworks and their key features.",
      "q38": "How does the browser render a web page? Explain the critical rendering path.",
      "q39": "What is the purpose of TypeScript in web development? How does it differ from JavaScript?",
      "q40": "Explain the purpose of HTTPS. How does it make a website more secure?"
    }
  }

  bc: any = {
    "result": {
      "q1": "What is blockchain technology, and how does it work?",
      "q2": "Explain the difference between public, private, and consortium blockchains.",
      "q3": "What is a blockchain node, and what roles can nodes perform in a network?",
      "q4": "Describe the concept of a distributed ledger. How does it differ from a traditional database?",
      "q5": "What is a consensus mechanism? Name and explain at least two types.",
      "q6": "What is the purpose of mining in a blockchain? How does it secure the network?",
      "q7": "Explain the difference between proof of work (PoW) and proof of stake (PoS).",
      "q8": "What are smart contracts, and how are they used in blockchain applications?",
      "q9": "What is the difference between Ethereum and Bitcoin blockchains?",
      "q10": "Describe the concept of gas fees in the Ethereum network. Why are they important?",
      "q11": "What are the key components of a blockchain transaction?",
      "q12": "Explain the concept of a hash function in the context of blockchain technology.",
      "q13": "What is a blockchain fork? Differentiate between hard forks and soft forks.",
      "q14": "How does a decentralized application (DApp) differ from a traditional application?",
      "q15": "What is a token in blockchain, and how does it differ from a cryptocurrency?",
      "q16": "Explain the difference between fungible and non-fungible tokens (NFTs). Provide examples.",
      "q17": "What is a wallet in blockchain, and how does it enable secure transactions?",
      "q18": "What is the role of cryptography in blockchain technology?",
      "q19": "Explain the concept of immutability in blockchain. Why is it important?",
      "q20": "What are the main challenges in scaling a blockchain network?",
      "q21": "Describe the concept of a Merkle tree and its importance in blockchain.",
      "q22": "What is the role of governance in blockchain? How is it implemented?",
      "q23": "How does the Lightning Network enhance the scalability of Bitcoin?",
      "q24": "What is the difference between layer 1 and layer 2 blockchain solutions?",
      "q25": "What are zero-knowledge proofs, and how are they used in blockchain?",
      "q26": "Explain the concept of decentralized finance (DeFi). What are its advantages?",
      "q27": "What is an Initial Coin Offering (ICO), and how does it differ from a Security Token Offering (STO)?",
      "q28": "How does blockchain technology ensure data transparency and security?",
      "q29": "What is the role of oracles in blockchain? Provide examples of their use.",
      "q30": "What is the InterPlanetary File System (IPFS), and how does it complement blockchain?",
      "q31": "Explain the concept of blockchain interoperability. Why is it important?",
      "q32": "What are the energy consumption concerns associated with blockchain? How can they be mitigated?",
      "q33": "Describe the difference between on-chain and off-chain transactions.",
      "q34": "What is the role of a genesis block in a blockchain network?",
      "q35": "Explain the difference between hot wallets and cold wallets in blockchain.",
      "q36": "What is a sidechain, and how does it enhance blockchain functionality?",
      "q37": "Describe the use of blockchain in supply chain management.",
      "q38": "What are the benefits and risks of using blockchain for identity management?",
      "q39": "How can blockchain technology improve voting systems?",
      "q40": "What is the role of governance tokens in decentralized organizations (DAOs)?"
    }
  }




  cards = [
    {
      title: 'Web Development',
      imgSrc: 'assets/computer-science/webdev/WEBDEV1.png',
      field: 'Computer Science',
      subfield: 'Web Development',
    },
    {
      title: 'Data Science',
      imgSrc: 'assets/computer-science/datascience/datascience.png',
      field: 'Computer Science',
      subfield: 'Data Science',
    },
    {
      title: 'Block Chain',
      imgSrc: 'assets/computer-science/blockchain/blockchain.png',
      field: 'Computer Science',
      subfield: 'Block Chain',
    },
    {
      title: 'Cyber Security',
      imgSrc: 'assets/computer-science/cyber-sec/cybersecurity.png',
      field: 'Computer Science',
      subfield: 'Cyber Security',
    }
  ];
  constructor(private location: Location, private router: Router, private qs: QuestionsService) { }
  goBack(): void {
    this.location.back();
  }
  navigateToQuestions(domain: string, subdomain: string) {
    this.router.navigate(['/questions'], { queryParams: { domain: domain, subdomain: subdomain } });
  }
}
