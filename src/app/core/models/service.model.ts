/**
 * Représente un service dans la bottom navigation
 */
export interface Service {
  id: string;
  name: string;
  icon: string;
  route: string;
  badge?: number;
  isActive?: boolean;
  default?: boolean
}

/**
 * Groupe de services par feature
 */
export interface ServiceGroup {
  featureId: string;
  services: Service[];
}