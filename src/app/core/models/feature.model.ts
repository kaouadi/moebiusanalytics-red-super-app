
import {Service } from "./service.model";
export {Service} from "./service.model"


export interface Feature {
  id: string;
  name: string;
  icon: string;
  route: string;
  description?: string;
}


export interface FeatureConfig {
  feature: Feature;
  services: Service[];
}
