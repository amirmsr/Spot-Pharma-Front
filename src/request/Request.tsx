import { useQuery } from "react-query";


//fetch all sessions

export  function FetchSessions(){
  
    const { data: elements, isLoading, isError } = useQuery("Sessions", async () => {
        try {
          const response = await fetch("https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/sessions");
          if (!response.ok) {
            throw new Error("Failed to fetch sessions");
          }
          const data = await response.json();
          return data;
        } catch (err) {
          throw new Error("An error occurred while fetching sessions");
        }
      });


    
    return { elements, isLoading, isError };

}


//fetch all intervenants
export  function FetchIntervenants(){
  
    const { data: interv } = useQuery("Intervenant", async () => {
        try {
          const response = await fetch("https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/intervenants");  
          if (!response.ok) {
            throw new Error("Failed to fetch interv");
          }
          const data = await response.json();
          return data;
        } catch (err) {
          throw new Error("An error occurred while fetching interv");
        }
      });


    
    return {interv};

}


//fetch all sponsors
export  function FetchSponsors(){
  
    const { data: sponsors, } = useQuery("Sponsors", async () => {
        try {
          const response = await fetch("https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/sponsors");  
          if (!response.ok) {
            throw new Error("Failed to fetch sponsors");
          }
          const data = await response.json();
          return data;
        } catch (err) {
          throw new Error("An error occurred while fetching sponsors");
        }
    });


    
    return {sponsors};

}


//fetch les intervenant des sessions
export  function FetchIntervSessions(){
  
    const { data: intervSessions, } = useQuery("IantervSessions", async () => {
        try {
        const response = await fetch(`https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/intervenants_session/`);  
        if (!response.ok) {
            throw new Error("Failed to fetch interv");
        }
        const data = await response.json();
        return data;
        } catch (err) {
        throw new Error("An error occurred while fetching interv");
        }
    });


    
    return {intervSessions};

}

//fetch les sponsors des sessions
export  function FetchSponsorsSessions(){
  
    const { data: sponsorsSession, } = useQuery("SponsorsSession", async () => {
        try {
        const response = await fetch(`https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/sponsors_session/`);  
        if (!response.ok) {
            throw new Error("Failed to fetch sponsors");
        }
        const data = await response.json();
        return data;
        } catch (err) {
        throw new Error("An error occurred while fetching sponsors");
        }
    });


    
    return {sponsorsSession};

}